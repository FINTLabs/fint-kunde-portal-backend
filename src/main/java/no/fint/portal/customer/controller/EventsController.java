package no.fint.portal.customer.controller;

import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import no.finn.unleash.DefaultUnleash;
import no.fint.audit.model.AuditEvent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Slf4j
@RestController
@Api(tags = "Events")
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/events/{environment}/{orgName}", produces = MediaType.APPLICATION_JSON_VALUE)
public class EventsController {

    private final RestTemplate restTemplate;
    private final DefaultUnleash unleashClient;


    public EventsController(
            @Value("${fint.events.username}") String username,
            @Value("${fint.events.password}") String password,
            RestTemplateBuilder builder,
            DefaultUnleash unleashClient) {
        this.unleashClient = unleashClient;
        restTemplate = builder.basicAuthentication(username, password)
                .additionalInterceptors((request, body, execution) -> {
                    log.debug("{} {}", request.getMethod(), request.getURI());
                    final ClientHttpResponse response = execution.execute(request, body);
                    log.debug("--> {}", response.getStatusCode());
                    return response;
                })
                .build();
        log.info("Initialized.");
    }

    @GetMapping(path = "/{component}/{action}")
    public ResponseEntity<List<AuditEvent>> query(
            @PathVariable String environment,
            @PathVariable String orgName,
            @PathVariable String component,
            @PathVariable String action
    ) {
        if (unleashClient.isEnabled("fint-kunde-portal.audit-log")) {
            return ResponseEntity.ok(
                    List.of(restTemplate
                            .getForObject("https://{environment}.felleskomponent.no/events/api/{orgName}/{component}/{action}",
                                    AuditEvent[].class,
                                    environment, orgName, component, action))
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    @GetMapping(path = "/id/{id}")
    public ResponseEntity<List<AuditEvent>> getById(
            @PathVariable String environment,
            @PathVariable String orgName,
            @PathVariable String id
    ) {
        if (unleashClient.isEnabled("fint-kunde-portal.audit-log")) {
            return ResponseEntity.ok(
                    List.of(restTemplate
                            .getForObject("https://{environment}.felleskomponent.no/events/api/id/{id}",
                                    AuditEvent[].class,
                                    environment, id))
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }
}
