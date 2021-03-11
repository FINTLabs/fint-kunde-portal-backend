package no.fint.portal.security;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.customer.service.RoleConfig;
import org.apache.commons.lang3.StringUtils;

@Slf4j
public class FintPortalRoleAuthority implements FintPortalAuthority {
    @Getter
    private final RoleConfig.RoleId roleId;

    @Getter
    private final String organisation;

    public FintPortalRoleAuthority(String role) {
        roleId = RoleConfig.RoleId.valueOf(StringUtils.substringBefore(role, "@"));
        organisation = StringUtils.substringAfter(role, "@");
    }

    @Override
    public boolean isAccessGranted(RoleConfig.RoleId roleId, String path) {
        log.trace("Is {}={} and {} startswith {}/ ?", roleId, this.roleId, path, organisation);
        return this.roleId.equals(roleId) && (organisation.equals(path) || StringUtils.startsWith(path, organisation + "/"));
    }

    @Override
    public String toString() {
        return getAuthority();
    }
}
