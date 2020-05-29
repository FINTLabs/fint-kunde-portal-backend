package no.fint.portal.customer.controller;

import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.model.ComponentConfiguration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Slf4j
@RestController
@Api(tags = "Component Configurations")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/components/configurations")

public class ComponentConfigController {
    private final RestTemplate restTemplate;
    private final String rootUri;

    public ComponentConfigController(
            RestTemplate restTemplate,
            @Value("${fint.portal.admin.uri}") String rootUri) {
        this.restTemplate = restTemplate;
        this.rootUri = rootUri;
    }

    @GetMapping
    public ResponseEntity<List<ComponentConfiguration>> getComponentConfigurations() {
        return restTemplate
                .exchange(
                        rootUri + "/api/components/configurations",
                        HttpMethod.GET,
                        null,
                        new ParameterizedTypeReference<List<ComponentConfiguration>>() {
                        }
                );
    }

}
