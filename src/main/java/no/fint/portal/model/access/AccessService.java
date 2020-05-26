package no.fint.portal.model.access;

import no.fint.portal.ldap.LdapService;
import no.fint.portal.model.client.Client;
import no.fint.portal.model.organisation.Organisation;
import no.fint.portal.utilities.LdapConstants;
import org.springframework.ldap.support.LdapNameBuilder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccessService {

    private final LdapService ldapService;
    private final AccessObjectService accessObjectService;

    public AccessService(LdapService ldapService, AccessObjectService accessObjectService) {
        this.ldapService = ldapService;
        this.accessObjectService = accessObjectService;
    }

    public List<Access> getAccesses(String orgName) {
        return ldapService.getAll(accessObjectService.getAccessBase(orgName).toString(), Access.class);
    }

    public boolean addAccess(Access access, Organisation organisation) {
        access.setDn(
                LdapNameBuilder.newInstance(organisation.getDn())
                .add(LdapConstants.OU, "access")
                .add(LdapConstants.OU, access.getName())
                .build()
        );

        return ldapService.createEntry(access);
    }

    public boolean updateAccess(Access access) {
        return ldapService.updateEntry(access);
    }

    public void removeAccess(Access access) {
        ldapService.deleteEntry(access);
    }

    public void linkClientToAccess(Access access, Client client) {
    }

    public void unlinkClientFromAccess(Access access, Client client) {
    }

    public Access getAccess(String accessId, String orgName) {
        return getAccessByDn(accessObjectService.getAccessDn(accessId, orgName));
    }

    private Access getAccessByDn(String accessDn) {
        return ldapService.getEntry(accessDn, Access.class);
    }
}
