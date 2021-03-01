package no.fint.portal.security;

import lombok.extern.slf4j.Slf4j;
import no.finn.unleash.DefaultUnleash;
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

    private final DefaultUnleash unleashClient;
    private final AuthorizationService authorizationService;

    public SecureUrlAccessDecisionVoter(DefaultUnleash unleashClient, AuthorizationService authorizationService) {
        this.unleashClient = unleashClient;
        this.authorizationService = authorizationService;
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
        log.debug("VOTING FOR:\nAuthorities: {}\nURL: {}", authentication.getAuthorities(), invocation.getRequestUrl());
        String[] securePaths = authorizationService.getSecurePaths();

        if (!StringUtils.startsWithAny(invocation.getRequestUrl(), securePaths)) {
            log.debug("Unsecured URL {}", invocation.getRequestUrl());
            return ACCESS_GRANTED;
        }

        if (authentication.getAuthorities().isEmpty() || authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ANONYMOUS"))) {
            log.warn("{} has no granted authorities!", authentication.getPrincipal());
            return ACCESS_DENIED;
        }

        if (unleashClient.isEnabled("fint-kunde-portal.roles")) {
            log.debug("Roles feature enabled. Evaluating roles...");
            if (authorizationService.isAuthorizedByRole(authentication, invocation)) {
                return authorizationService.isAuthorizedToOrganisation(authentication, invocation, securePaths);
            }
        } else {
            log.debug("Roles feature disabled.");
            return authorizationService.isAuthorizedToOrganisation(authentication, invocation, securePaths);
        }


        log.warn("Denied access to {} requested by {}", invocation, authentication);
        return ACCESS_DENIED;
    }
}
