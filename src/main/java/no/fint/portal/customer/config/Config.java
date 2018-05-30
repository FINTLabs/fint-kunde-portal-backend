package no.fint.portal.customer.config;

import no.fint.portal.oauth.NamOAuthClientService;
import no.fint.portal.oauth.OAuthClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

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
}
