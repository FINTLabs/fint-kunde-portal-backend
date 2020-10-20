package no.fint.portal.security;

import no.fint.portal.customer.service.PortalApiService;
import no.fint.portal.model.contact.Contact;
import no.fint.portal.model.organisation.Organisation;
import no.fint.portal.model.organisation.OrganisationService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class UserService {

    private final PortalApiService portalApiService;
    private final OrganisationService organisationService;

    public UserService(PortalApiService portalApiService, OrganisationService organisationService) {
        this.portalApiService = portalApiService;
        this.organisationService = organisationService;
    }

    @Cacheable("users")
    public User getUser(String nin) {
        final Contact contact = portalApiService.getContact(nin);
        User user = new User();
        user.setId(contact.getMail());
        user.setOrganizations(
                Stream.concat(
                        Optional.ofNullable(contact.getLegal()).map(List::stream).orElseGet(Stream::empty),
                        Optional.ofNullable(contact.getTechnical()).map(List::stream).orElseGet(Stream::empty))
                        .map(organisationService::getOrganisationByDn)
                        .filter(Optional::isPresent)
                        .map(Optional::get)
                        .map(Organisation::getName)
                        .toArray(String[]::new));
        return user;
    }
}
