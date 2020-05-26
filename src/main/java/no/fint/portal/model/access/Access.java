package no.fint.portal.model.access;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import no.fint.portal.ldap.BasicLdapEntry;
import org.springframework.ldap.odm.annotations.Attribute;
import org.springframework.ldap.odm.annotations.Entry;
import org.springframework.ldap.odm.annotations.Id;
import org.springframework.ldap.support.LdapNameBuilder;

import javax.naming.Name;
import java.util.List;

@ApiModel
@Data
@Entry(objectClasses = {"organizationalUnit", "top", "fintAccess"})
public class Access implements BasicLdapEntry {
    @Id
    private Name dn;

    @ApiModelProperty(value = "Technical name of the access.")
    @Attribute(name = "ou")
    private String name;

    @Attribute(name = "fintAccessCollection")
    private List<String> collection;

    @Attribute(name = "fintAccessRead")
    private List<String> read;

    @Attribute(name = "fintAccessModify")
    private List<String> modify;

    @Override
    public String getDn() {
        if (dn != null) {
            return dn.toString();
        } else {
            return null;
        }
    }

    @Override
    public void setDn(Name dn) {
        this.dn = dn;

    }

    @Override
    public void setDn(String dn) {
        this.dn = LdapNameBuilder.newInstance(dn).build();
    }

}
