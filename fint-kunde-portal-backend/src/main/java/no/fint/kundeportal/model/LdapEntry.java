package no.fint.kundeportal.model;

import org.springframework.ldap.odm.annotations.Entry;

@Entry(objectClasses = "")
public interface LdapEntry {
    String getDn();
}
