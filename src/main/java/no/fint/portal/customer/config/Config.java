package no.fint.portal.customer.config;

import no.fint.portal.oauth.NamOAuthClientService;
import no.fint.portal.oauth.OAuthClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.ResponseErrorHandler;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Configuration
public class Config {

    @Bean
    @Profile("test")
    NamOAuthClientService namOAuthClientService() {
        return new NamOAuthClientService() {
            @Override
            public OAuthClient addOAuthClient(String name) {
                return newOAuthClient(name);
            }

            private OAuthClient newOAuthClient(String name) {
                OAuthClient oAuthClient = new OAuthClient(name);
                oAuthClient.setClientId(name + "_ClientId");
                oAuthClient.setClientSecret(name + "_ClientSecret");
                return oAuthClient;
            }

            @Override
            public void removeOAuthClient(String clientId) {
            }

            @Override
            public OAuthClient getOAuthClient(String clientId) {
                return newOAuthClient(clientId);
            }
        };
    }

    @Bean
    @Qualifier("zendesk")
    @ConditionalOnProperty("fint.zendesk.enabled")
    RestTemplate zendeskRestTemplate(
            RestTemplateBuilder builder,
            ResponseErrorHandler handler,
            @Value("${fint.zendesk.url}") String rootUri) {
        return builder
                .rootUri(rootUri)
                .errorHandler(handler)
                .build();
    }

    @Bean
    @ConditionalOnProperty("fint.zendesk.enabled")
    ResponseErrorHandler responseErrorHandler() {
        return new ResponseErrorHandler() {
            Logger log = LoggerFactory.getLogger("no.fint.http");
            @Override
            public boolean hasError(ClientHttpResponse response) {
                return false;
            }

            @Override
            public void handleError(ClientHttpResponse response) throws IOException {
                log.info("Error: {}", response.getStatusCode());
            }
        };
    }
}
