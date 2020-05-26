package no.fint.portal.model.access;

import no.fint.portal.utilities.LdapConstants;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ldap.support.LdapNameBuilder;
import org.springframework.stereotype.Service;

import javax.naming.Name;

@Service
public class AccessObjectService {
    private final String organisationBase;

    public AccessObjectService(
            @Value("${fint.ldap.organisation-base}") String organisationBase
    ) {
        this.organisationBase = organisationBase;
    }

    public Name getAccessBase(String orgName) {
        return LdapNameBuilder.newInstance(organisationBase)
                .add(LdapConstants.OU, orgName)
                .add(LdapConstants.OU, "access")
                .build();
    }

    public String getAccessDn(String accessId, String orgName) {
        return LdapNameBuilder.newInstance(getAccessBase(orgName))
                .add(LdapConstants.OU, accessId)
                .build()
                .toString();
    }
}
