package no.fint.portal.security;

import lombok.extern.slf4j.Slf4j;
import no.fint.portal.customer.service.RoleConfig;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.FilterInvocation;
import org.springframework.stereotype.Service;

import java.util.function.Predicate;
import java.util.function.ToIntFunction;

import static org.springframework.security.access.AccessDecisionVoter.*;

@Slf4j
@Service
public class AuthorizationService {

    private final RoleConfig roleConfig;

    public AuthorizationService(RoleConfig roleConfig) {
        this.roleConfig = roleConfig;
    }

    public String[] getSecurePaths() {
        return roleConfig.getRoles().stream()
                .map(RoleConfig.Role::getUri)
                .filter(StringUtils::isNotBlank)
                .toArray(String[]::new);
    }

    public int authorizeRequest(Authentication authentication, FilterInvocation invocation) {
        return roleConfig.getRoles().stream()
                .filter(requestUri(invocation))
                .peek(it -> log.trace("Role: {}", it))
                .mapToInt(authorize(authentication, invocation))
                .peek(it -> log.trace("Result: {}", it))
                .findFirst()
                .orElse(ACCESS_ABSTAIN);
    }

    private ToIntFunction<RoleConfig.Role> authorize(Authentication authentication, FilterInvocation invocation) {
        return role -> {
            final String requestUrl = StringUtils.removeStart(invocation.getRequestUrl(), role.getUri());
            return authentication.getAuthorities().stream()
                    .filter(FintPortalAuthority.class::isInstance)
                    .map(FintPortalAuthority.class::cast)
                    .peek(it -> log.trace("Evaluating {}", it))
                    .filter(auth -> auth.isAccessGranted(role.getId(), requestUrl))
                    .peek(it -> log.debug("Granted: {} for role {}", it, role))
                    .map(it -> ACCESS_GRANTED)
                    .findFirst()
                    .orElse(ACCESS_DENIED);
        };
    }

    private Predicate<RoleConfig.Role> requestUri(FilterInvocation invocation) {
        final String requestUrl = invocation.getRequestUrl();
        return role -> StringUtils.startsWith(requestUrl, role.getUri());
    }

}
