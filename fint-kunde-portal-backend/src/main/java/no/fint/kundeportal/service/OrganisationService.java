package no.fint.kundeportal.service;

import lombok.extern.slf4j.Slf4j;
import no.fint.kundeportal.model.Contact;
import no.fint.kundeportal.model.Organisation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.naming.directory.SearchControls;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class OrganisationService {

    @Autowired
    private LdapService ldapService;

    @Autowired
    private DnService dnService;

    private SearchControls searchControls;

    @Value("${fint.ldap.organisation-base}")
    private String organisationBase;

    public OrganisationService() {
        searchControls = new SearchControls();
        searchControls.setSearchScope(SearchControls.SUBTREE_SCOPE);
    }

    public boolean createOrganization(Organisation organisation) {
        log.info("Creating organisation: {}", organisation);

        if (organisation.getDn() == null) {
            dnService.setOrganisationDn(organisation);
        }
        return ldapService.create(organisation);
    }

    public List<Organisation> getOrganizations() {
        return ldapService.getAll(organisationBase, Organisation.class);
    }

    public Optional<Organisation> getOrganization(String orgId) {
        Optional<String> stringDnById = Optional.ofNullable(ldapService.getStringDnById(orgId, organisationBase, Organisation.class));

        if (stringDnById.isPresent()) {
            return Optional.of(ldapService.getEntry(stringDnById.get(), Organisation.class));
        }
        return Optional.empty();
    }

    public List<Contact> getOrganizationContacts(String id) {
        return ldapService.getAll(dnService.getOrganisationDnById(id), Contact.class);
    }
}
