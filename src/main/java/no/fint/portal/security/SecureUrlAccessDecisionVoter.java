package no.fint.portal.security;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDecisionVoter;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.FilterInvocation;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;

@Service
@Slf4j
public class SecureUrlAccessDecisionVoter implements AccessDecisionVoter<FilterInvocation> {
    @Value("${fint.portal.secure.paths:/api/adapters/,/api/assets/,/api/clients/,/api/components/organisation/,/api/organisations/}")
    private String[] securePaths;

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
        if (!StringUtils.startsWithAny(invocation.getRequestUrl(), securePaths)) {
            log.debug("Unsecured URL {}", invocation.getRequestUrl());
            return ACCESS_GRANTED;
        }
        if (authentication.getAuthorities().isEmpty() || authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ANONYMOUS"))) {
            log.warn("{} has no granted authorities!", authentication.getPrincipal());
            return ACCESS_DENIED;
        }
        final var authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).toArray(String[]::new);
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
        log.warn("Denied access to {} requested by {}", invocation, authentication);
        return ACCESS_DENIED;
    }
}
