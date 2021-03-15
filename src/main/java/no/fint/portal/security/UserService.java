package no.fint.portal.security;

import no.finn.unleash.DefaultUnleash;
import no.fint.portal.customer.service.IdentityMaskingService;
import no.fint.portal.customer.service.PortalApiService;
import no.fint.portal.exceptions.EntityNotFoundException;
import no.fint.portal.model.contact.Contact;
import no.fint.portal.model.organisation.Organisation;
import no.fint.portal.model.organisation.OrganisationService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class UserService implements UserDetailsService {

    private final PortalApiService portalApiService;
    private final OrganisationService organisationService;
    private final IdentityMaskingService identityMaskingService;
    private final DefaultUnleash unleashClient;

    public UserService(PortalApiService portalApiService, OrganisationService organisationService, IdentityMaskingService identityMaskingService, DefaultUnleash unleashClient) {
        this.portalApiService = portalApiService;
        this.organisationService = organisationService;
        this.identityMaskingService = identityMaskingService;
        this.unleashClient = unleashClient;
    }

    @Override
    @Cacheable("users")
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if ("0".equals(username)) {
            return User.withUsername("DUMMY").password("").authorities(Collections.emptyList()).build();
        }
        try {
            final var contact = portalApiService.getContact(username);
            return User.builder()
                    .passwordEncoder(identityMaskingService::mask)
                    .username(contact.getMail())
                    .password(contact.getNin())
                    .authorities(getAuthorities(contact))
                    .build();
        } catch (EntityNotFoundException e) {
            throw new UsernameNotFoundException(username);
        }
    }

    private Collection<FintPortalAuthority> getAuthorities(Contact contact) {
        if (contact == null) {
            return Collections.emptyList();
        }
        if (unleashClient.isEnabled("fint-kunde-portal.roles")) {
            if (contact.getRoles() == null) {
                return Collections.emptyList();
            }
            return contact.getRoles()
                    .stream()
                    .filter(StringUtils::isNotBlank)
                    .filter(s -> s.contains("@"))
                    .map(FintPortalAuthority::create)
                    .collect(Collectors.toList());
        }
        return stream(contact.getLegal(), contact.getTechnical())
                .map(organisationService::getOrganisationByDn)
                .flatMap(Optional::stream)
                .map(Organisation::getName)
                .map(FintPortalOrganizationAuthority::new)
                .collect(Collectors.toList());
    }

    private Stream<String> stream(Collection<String>... collections) {
        if (collections == null) {
            return Stream.empty();
        }
        return Arrays.stream(collections)
                .filter(Objects::nonNull)
                .flatMap(Collection::stream);
    }
}
