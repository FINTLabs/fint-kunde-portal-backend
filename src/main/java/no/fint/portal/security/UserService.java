package no.fint.portal.security;

import no.fint.portal.customer.service.PortalApiService;
import no.fint.portal.model.contact.Contact;
import no.fint.portal.model.organisation.Organisation;
import no.fint.portal.model.organisation.OrganisationService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class UserService implements UserDetailsService {

    private final PortalApiService portalApiService;
    private final OrganisationService organisationService;

    public UserService(PortalApiService portalApiService, OrganisationService organisationService) {
        this.portalApiService = portalApiService;
        this.organisationService = organisationService;
    }

    @Override
    @Cacheable("users")
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if ("0".equals(username)) {
            return User.withUsername("DUMMY").password("").authorities(Collections.emptyList()).build();
        }
        final Contact contact = portalApiService.getContact(username);
        return User.withDefaultPasswordEncoder()
                .username(contact.getMail())
                .password(contact.getNin())
                .authorities(Stream.concat(
                        Optional.ofNullable(contact.getLegal()).map(List::stream).orElseGet(Stream::empty),
                        Optional.ofNullable(contact.getTechnical()).map(List::stream).orElseGet(Stream::empty))
                        .map(organisationService::getOrganisationByDn)
                        .filter(Optional::isPresent)
                        .map(Optional::get)
                        .map(Organisation::getName)
                        .toArray(String[]::new))
                .build();
    }
}
