package no.fint.portal.security;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.access.AccessDecisionVoter;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.FilterInvocation;
import org.springframework.stereotype.Service;

import java.util.Collection;


@Service
@Slf4j
public class SecureUrlAccessDecisionVoter implements AccessDecisionVoter<FilterInvocation> {

    private final AuthorizationService authorizationService;
    private final String[] securePaths;
    private final String[] ignoredPaths = {"/actuator/health", "/actuator/prometheus"};

    public SecureUrlAccessDecisionVoter(AuthorizationService authorizationService) {
        this.authorizationService = authorizationService;
        securePaths = this.authorizationService.getSecurePaths();
    }

    @Override
    public boolean supports(ConfigAttribute attribute) {
        log.info("Supports attribute: {}", attribute);
        return true;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        log.info("Supports class: {}", clazz);
        return FilterInvocation.class.isAssignableFrom(clazz);
    }

    @Override
    public int vote(Authentication authentication, FilterInvocation invocation, Collection<ConfigAttribute> attributes) {

        logDebug("Authorization: {}", invocation.getRequestUrl());

        if (!StringUtils.startsWithAny(invocation.getRequestUrl(), securePaths)) {
            logDebug("Unsecured URL {}", invocation.getRequestUrl());
            return ACCESS_GRANTED;
        }

        if (authentication.getAuthorities().isEmpty() || authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ANONYMOUS"))) {
            log.warn("{} has no granted authorities!", authentication.getPrincipal());
            return ACCESS_DENIED;
        }

        return authorizationService.authorizeRequest(authentication, invocation);
    }

    private void logDebug(String message, String requestUrl) {
        if (notIgnoredPath(requestUrl)) {
            log.debug(message, requestUrl);
        }
    }

    private boolean notIgnoredPath(String requestUrl) {
        return !StringUtils.startsWithAny(requestUrl, ignoredPaths);
    }
}
