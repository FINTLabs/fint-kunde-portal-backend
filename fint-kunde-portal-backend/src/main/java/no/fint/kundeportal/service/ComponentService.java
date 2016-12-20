package no.fint.kundeportal.service;

import lombok.extern.slf4j.Slf4j;
import no.fint.kundeportal.model.Component;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.naming.directory.SearchControls;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class ComponentService {

    @Autowired
    LdapService ldapService;

    @Autowired
    private DnService dnService;

    private SearchControls searchControls;

    @Value("${fint.ldap.component-base}")
    private String componentBase;

    public ComponentService() {
        searchControls = new SearchControls();
        searchControls.setSearchScope(SearchControls.SUBTREE_SCOPE);
    }

    public boolean createComponent(Component component) {
        log.info("Creating component: {}", component);

        if (component.getDn() == null) {
            dnService.setComponentDn(component);
        }
        return ldapService.create(component);
    }

    public boolean updateComponent(Component component) {
        log.info("Updating component: {}", component);

        return ldapService.update(component);
    }

    public List<Component> getComponents() {
        return ldapService.getAll(componentBase, Component.class);
    }

    public Optional<Component> getComponent(String technicalName) {
        Optional<String> stringDnById = Optional.ofNullable(ldapService.getStringDnById(technicalName, componentBase, Component.class));

        if (stringDnById.isPresent()) {
            return Optional.of(ldapService.getEntry(stringDnById.get(), Component.class));
        }
        return Optional.empty();
    }
}
