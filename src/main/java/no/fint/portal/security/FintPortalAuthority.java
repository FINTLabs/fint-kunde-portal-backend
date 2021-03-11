package no.fint.portal.security;

import no.fint.portal.customer.service.RoleConfig;
import org.springframework.security.core.GrantedAuthority;

public interface FintPortalAuthority extends GrantedAuthority {
    static FintPortalAuthority create(String role) {
        if (role.startsWith("ROLE_ADMIN@")) {
            return new FintPortalAdminAuthority(role);
        }
        return new FintPortalRoleAuthority(role);
    }

    boolean isAccessGranted(RoleConfig.RoleId roleId, String path);

    RoleConfig.RoleId getRoleId();

    String getOrganisation();

    default String getAuthority() {
        return getRoleId().name() + "@" + getOrganisation();
    }

}
