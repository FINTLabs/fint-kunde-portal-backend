package no.fint.portal.customer.controller;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
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
@Tag(name = "Tests")
@CrossOrigin(origins = "*")
@RequestMapping("/tests/{orgName}")
public class TestsController {
    private final RestTemplate restTemplate;
    private final String linkWalkerUri;
    private final String testRunnerUri;

    public TestsController(
            @Value("${fint.portal.tests.trace:false}") boolean trace,
            @Value("${fint.portal.tests.link-walker:http://localhost:8081}") String linkWalkerUri,
            @Value("${fint.portal.tests.test-runner:http://localhost:8082}") String testRunnerUri,
            RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        this.linkWalkerUri = linkWalkerUri;
        this.testRunnerUri = testRunnerUri;
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
    public ResponseEntity<byte[]> linkWalker(HttpServletRequest request, @RequestHeader HttpHeaders headers, @RequestBody(required = false) byte[] body) {
        final HttpMethod method = HttpMethod.valueOf(request.getMethod());
        final HttpEntity<Object> httpEntity = new HttpEntity<>(body, headers);
        log.info("Link-walker uri: {}", linkWalkerUri + request.getRequestURI());
        final ResponseEntity<byte[]> responseEntity = restTemplate.exchange(linkWalkerUri + request.getRequestURI(), method, httpEntity, byte[].class);
        return ResponseEntity.status(responseEntity.getStatusCode()).headers(filter(responseEntity.getHeaders())).body(responseEntity.getBody());
    }

    @RequestMapping({"/health", "/basic", "/auth/**"})
    public ResponseEntity<byte[]> testRunner(HttpServletRequest request, @RequestHeader HttpHeaders headers, @RequestBody(required = false) byte[] body) {
        final HttpMethod method = HttpMethod.valueOf(request.getMethod());
        final HttpEntity<Object> httpEntity = new HttpEntity<>(body, headers);
        String modifiedUri = testRunnerUri + request.getRequestURI().replace("api/tests", "test-runner");
        log.info("TestRunneruri: {}", modifiedUri);
        final ResponseEntity<byte[]> responseEntity = restTemplate.exchange(modifiedUri, method, httpEntity, byte[].class);
        return ResponseEntity.status(responseEntity.getStatusCode()).headers(filter(responseEntity.getHeaders())).body(responseEntity.getBody());
    }

    private HttpHeaders filter(HttpHeaders headers) {
        HttpHeaders result = new HttpHeaders();
        headers.forEach((k, v) -> {
            if (!StringUtils.equalsAny(k, HttpHeaders.TRANSFER_ENCODING)) {
                result.put(k, v);
            }
        });
        return result;
    }
}
