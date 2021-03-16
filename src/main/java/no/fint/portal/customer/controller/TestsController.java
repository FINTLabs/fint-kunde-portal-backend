package no.fint.portal.customer.controller;

import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Collections;

@Slf4j
@RestController
@Api(tags = "Tests")
@CrossOrigin(origins = "*")
@RequestMapping("/api/tests/{orgName}")
public class TestsController {
    private final RestTemplate restTemplate;

    public TestsController(
            @Value("${fint.portal.tests.trace:false}") boolean trace,
            RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        if (trace) {
            this.restTemplate.setInterceptors(Collections.singletonList((request, body, execution) -> {
                final ClientHttpResponse response;
                try {
                    log.debug("{} {}", request.getMethod(), request.getURI());
                    response = execution.execute(request, body);
                    log.info("{} {} => {}", request.getMethod(), request.getURI(), response.getStatusCode());
                    return response;
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }));
        }
    }

    @RequestMapping("/links/**")
    public ResponseEntity<byte[]> linkWalker(HttpServletRequest request, @RequestHeader HttpHeaders headers, @RequestBody byte[] body) {
        final HttpMethod method = HttpMethod.valueOf(request.getMethod());
        final HttpEntity<Object> httpEntity = new HttpEntity<>(body, headers);
        final ResponseEntity<byte[]> responseEntity = restTemplate.exchange("http://localhost:8081/{uri}", method, httpEntity, byte[].class, request.getRequestURI());
        return ResponseEntity.status(responseEntity.getStatusCode()).body(responseEntity.getBody());
    }

    @RequestMapping({"/health", "/basic", "/auth/**"})
    public ResponseEntity<byte[]> testRunner(HttpServletRequest request, @RequestHeader HttpHeaders headers, @RequestBody byte[] body) {
        final HttpMethod method = HttpMethod.valueOf(request.getMethod());
        final HttpEntity<Object> httpEntity = new HttpEntity<>(body, headers);
        final ResponseEntity<byte[]> responseEntity = restTemplate.exchange("http://localhost:8083" + request.getRequestURI(), method, httpEntity, byte[].class);
        return ResponseEntity.status(responseEntity.getStatusCode()).body(responseEntity.getBody());
    }
}
