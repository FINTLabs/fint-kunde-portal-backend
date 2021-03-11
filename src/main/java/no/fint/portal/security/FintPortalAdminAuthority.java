package no.fint.portal.security;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.customer.service.RoleConfig;
import org.apache.commons.lang3.StringUtils;

@Slf4j
public class FintPortalAdminAuthority implements FintPortalAuthority {
    @Getter
    private final RoleConfig.RoleId roleId = RoleConfig.RoleId.ROLE_ADMIN;

    @Getter
    private final String organisation;

    public FintPortalAdminAuthority(String role) {
        assert role.startsWith("ROLE_ADMIN@");
        organisation = StringUtils.substringAfter(role, "@");
    }

    @Override
    public boolean isAccessGranted(RoleConfig.RoleId roleId, String path) {
        log.trace("Does {} start with {}/ ?", path, organisation);
        return organisation.equals(path) || StringUtils.startsWith(path, organisation + "/");
    }

    @Override
    public String toString() {
        return getAuthority();
    }
}
