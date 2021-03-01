package no.fint.portal.customer.service;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Data
@Configuration
@ConfigurationProperties(prefix = "fint.customer.portal")
public class RoleConfig {

    private List<Role> roles;

    @Data
    public static class Role {
        private String id;
        private String name;
        private String description;
        private String uri;
    }
}
