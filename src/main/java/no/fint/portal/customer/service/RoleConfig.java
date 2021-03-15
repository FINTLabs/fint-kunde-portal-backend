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

    public enum RoleId {
        ROLE_ADMIN,
        ROLE_ADAPTER,
        ROLE_CLIENT,
        ROLE_CONTACT,
        ROLE_COMPONENT,
        ROLE_ACCESS_PACKAGE,
        ROLE_SUPPORT,
        ROLE_TEST,
        ROLE_LOG,
        ROLE_ASSET,
        ROLE_ORGANISATION
    }

    @Data
    public static class Role {
        private RoleId id;
        private String name;
        private String description;
        private String uri;
    }
}
