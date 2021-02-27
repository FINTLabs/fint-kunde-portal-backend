package no.fint.portal.security;

import no.fint.portal.customer.service.IdentityMaskingService;
import no.fint.portal.customer.service.PortalApiService;
import no.fint.portal.exceptions.EntityNotFoundException;
import no.fint.portal.model.organisation.Organisation;
import no.fint.portal.model.organisation.OrganisationService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class UserService implements UserDetailsService {

    private final PortalApiService portalApiService;
    private final OrganisationService organisationService;
    private final IdentityMaskingService identityMaskingService;

    public UserService(PortalApiService portalApiService, OrganisationService organisationService, IdentityMaskingService identityMaskingService) {
        this.portalApiService = portalApiService;
        this.organisationService = organisationService;
        this.identityMaskingService = identityMaskingService;
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

    private String[] getAuthorities(no.fint.portal.model.contact.Contact contact) {
        List<String> authorities = Stream.concat(
                Optional.ofNullable(contact.getLegal()).stream().flatMap(Collection::stream),
                Optional.ofNullable(contact.getTechnical()).stream().flatMap(Collection::stream))
                .map(organisationService::getOrganisationByDn)
                .flatMap(Optional::stream)
                .map(Organisation::getName)
                .collect(Collectors.toList());

        authorities.addAll(contact.getRoles());

        return authorities.toArray(String[]::new);


    }
}
