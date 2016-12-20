package no.fint.kundeportal.utilities;

import no.fint.kundeportal.model.Component;
import no.fint.kundeportal.model.Contact;
import no.fint.kundeportal.model.Organisation;

public enum LdapIdUtility {
    ;

    public static <T> String getIdAttribute(Class<T> type) {

        if (type.getName().equals(Organisation.class.getName())) {
            return "fintOrgId";
        }

        if (type.getName().equals(Component.class.getName())) {
            return "fintCompTechnicalName";
        }

        if (type.getName().equals(Contact.class.getName())) {
            return "cn";
        }

        return null;
    }
}
