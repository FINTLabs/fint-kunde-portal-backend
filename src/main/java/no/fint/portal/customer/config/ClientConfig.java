package no.fint.portal.customer.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class ClientConfig {

    @Value("${fint.client-config.linkwalker-base-url:http://localhost:8082}")
    private String linkwalkerBaseUrl;

    @Value("${fint.client-config.test-service-base-url:http://localhost:8083}")
    private String testServiceBaseUrl;

}
