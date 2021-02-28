package no.fint.portal.security;

import lombok.extern.slf4j.Slf4j;
import no.fint.portal.customer.service.RoleConfig;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.FilterInvocation;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Objects;

import static org.springframework.security.access.AccessDecisionVoter.ACCESS_DENIED;
import static org.springframework.security.access.AccessDecisionVoter.ACCESS_GRANTED;

@Slf4j
@Service
public class AuthorizationService {

    private final RoleConfig roleConfig;

    public AuthorizationService(RoleConfig roleConfig) {
        this.roleConfig = roleConfig;
    }

    public boolean isAdmin(Authentication authentication) {
        return authentication
                .getAuthorities()
                .stream()
                .filter(it -> it.getAuthority().equals("ROLE_ADMIN"))
                .count() == 1;
    }

    public boolean hasRole(Authentication authentication, RoleConfig.Role role) {
        return authentication
                .getAuthorities()
                .stream()
                .filter(grantedAuthority -> grantedAuthority.getAuthority().equals(role.getId()))
                .count() == 1;
    }

    public String[] getSecurePaths() {
        return roleConfig.getRoles().stream()
                .map(RoleConfig.Role::getUri)
                .filter(Objects::nonNull)
                .toArray(String[]::new);
    }

    public boolean isAuthorizedByRole(Authentication authentication, FilterInvocation invocation) {
        log.debug("Roles: {}", Arrays.toString(authentication.getAuthorities().toArray()));
        if (isAdmin(authentication)) {
            log.debug("{} is admin", authentication.getPrincipal().toString());
            return true;
        }
        return roleConfig.getRoles().stream()
                .filter(role -> role.getUri() != null)
                .peek(it -> log.debug("Considering uri {}", it.getUri()))
                .filter(role -> invocation.getRequestUrl().startsWith(role.getUri()))
                .peek(it -> log.debug("Found {}", it.getUri()))
                .peek(it -> log.debug("Looking for role {}", it.getId()))
                .filter(role -> hasRole(authentication, role))
                .peek(it -> log.debug("Found {} role", it.getId()))
                .count() == 1;
    }

    public Integer isAuthorizedToOrganisation(Authentication authentication, FilterInvocation invocation, String[] securePaths) {
        final var authorities = getAuthorities(authentication);
        log.debug("Authorities: {}", Arrays.toString(authorities));
        if (Arrays.stream(securePaths)
                .peek(it -> log.debug("Considering {}", it))
                .filter(it -> StringUtils.startsWith(invocation.getRequestUrl(), it))
                .peek(it -> log.debug("Found {}", it))
                .map(it -> StringUtils.substringAfter(invocation.getRequestUrl(), it))
                .peek(it -> log.debug("Matching {}", it))
                .allMatch(it -> StringUtils.startsWithAny(it, authorities))) {
            return ACCESS_GRANTED;
        }
        return ACCESS_DENIED;
    }

    public String[] getAuthorities(Authentication authentication) {
        return ArrayUtils.addAll(
                authentication
                        .getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .toArray(String[]::new),
                authentication
                        .getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .map(it -> it.replace("_", "."))
                        .toArray(String[]::new)
        );
    }
}
