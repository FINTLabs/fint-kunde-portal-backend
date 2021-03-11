package no.fint.portal.security;

import lombok.Getter;
import no.fint.portal.customer.service.RoleConfig;
import org.apache.commons.lang3.StringUtils;

public class FintPortalOrganizationAuthority implements FintPortalAuthority {
    @Getter
    private final RoleConfig.RoleId roleId = RoleConfig.RoleId.ROLE_ADMIN;

    @Getter
    private final String organisation;

    public FintPortalOrganizationAuthority(String organisation) {
        this.organisation = organisation;
    }

    @Override
    public boolean isAccessGranted(RoleConfig.RoleId roleId, String path) {
        return organisation.equals(path) || StringUtils.startsWith(path, organisation + "/");
    }

    @Override
    public String toString() {
        return organisation;
    }
}
