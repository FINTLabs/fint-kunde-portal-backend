package no.fint.kundeportal.service;

import no.fint.kundeportal.model.LdapEntry;
import no.fint.kundeportal.utilities.LdapIdUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.filter.EqualsFilter;
import org.springframework.ldap.support.LdapNameBuilder;
import org.springframework.stereotype.Service;

import javax.naming.Name;
import javax.naming.directory.SearchControls;
import java.util.List;

@Service
public class LdapService {

    @Autowired
    LdapTemplate ldapTemplate;

    private SearchControls searchControls;

    public LdapService() {
        searchControls = new SearchControls();
        searchControls.setSearchScope(SearchControls.SUBTREE_SCOPE);
    }

    public boolean create(LdapEntry ldapEntry) {

        if (!exists(ldapEntry.getDn())) {
            ldapTemplate.create(ldapEntry);
            return true;
        }
        return false;
    }

    public boolean update(LdapEntry ldapEntry) {
        if (exists(ldapEntry.getDn())) {
            ldapTemplate.update(ldapEntry);
            return true;
        }
        return false;
    }

    public <T> Name getDnById(String id, String base, Class<T> type) {
        List<T> ldapEntries = ldapTemplate.find(
                LdapNameBuilder.newInstance(base).build(),
                new EqualsFilter(LdapIdUtility.getIdAttribute(type), id),
                searchControls, type);

        if (ldapEntries.size() == 1) {
            return LdapNameBuilder.newInstance(((LdapEntry) ldapEntries.get(0)).getDn()).build();
        } else {
            return null;
        }
    }

    public <T> String getStringDnById(String id, String base, Class<T> type) {
        List<T> ldapEntries = ldapTemplate.find(
                LdapNameBuilder.newInstance(base).build(),
                new EqualsFilter(LdapIdUtility.getIdAttribute(type), id),
                searchControls, type);

        if (ldapEntries.size() == 1) {
            return ((LdapEntry) ldapEntries.get(0)).getDn();
        } else {
            return null;
        }
    }

    private boolean exists(String dn) {
        try {
            ldapTemplate.lookup(LdapNameBuilder.newInstance(dn).build());
            return true;
        } catch (org.springframework.ldap.NamingException e) {
            return false;
        }
    }

    public <T> List<T> getAll(String base, Class<T> type) {
        if (exists(base)) {
            return ldapTemplate.findAll(LdapNameBuilder.newInstance(base).build(), searchControls, type);
        }
        return null;
    }

    public <T> T getEntry(String dn, Class<T> type) {
        return ldapTemplate.findByDn(LdapNameBuilder.newInstance(dn).build(), type);
    }
}
