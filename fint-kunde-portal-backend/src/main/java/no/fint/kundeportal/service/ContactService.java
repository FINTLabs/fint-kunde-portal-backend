package no.fint.kundeportal.service;

import lombok.extern.slf4j.Slf4j;
import no.fint.kundeportal.model.Contact;
import no.fint.kundeportal.model.Organisation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.naming.directory.SearchControls;
import java.util.Optional;

@Slf4j
@Service
public class ContactService {

    @Autowired
    LdapService ldapService;

    @Autowired
    private DnService dnService;

    private SearchControls searchControls;

    @Value("${fint.ldap.organisation-base}")
    private String organisationBase;

    public ContactService() {
        searchControls = new SearchControls();
        searchControls.setSearchScope(SearchControls.SUBTREE_SCOPE);
    }

    public boolean createContact(Contact contact) {
        log.info("Creating contact: {}", contact);

        if (contact.getDn() == null) {
            dnService.setContactDn(contact);
        }
        return ldapService.create(contact);
    }


    public Optional<Contact> getContact(String ninRealm) {

        if (ninRealm.contains("@")) {
            String nin = ninRealm.split("@")[0];
            String realm = ninRealm.split("@")[1];

            Optional<String> stringDnById = Optional.ofNullable(ldapService.getStringDnById(realm, organisationBase, Organisation.class));

            if (stringDnById.isPresent()) {
                return Optional.of(ldapService.getEntry(String.format("cn=%s,%s", nin, stringDnById.get()), Contact.class));
            }
            //return Optional.empty();
        }
        return Optional.empty();
    }

}
