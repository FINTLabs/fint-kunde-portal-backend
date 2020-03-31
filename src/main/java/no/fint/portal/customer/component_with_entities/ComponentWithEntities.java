package no.fint.portal.customer.component_with_entities;

import lombok.Data;

import javax.naming.Name;
import java.util.ArrayList;
import java.util.List;

@Data
public class ComponentWithEntities{

    private String dn;

    private String name;

    private String description;

    private List<String> organisations = new ArrayList();

    private List<String> clients = new ArrayList();

    private List<String> adapters = new ArrayList();

    private String basePath;

    private Integer port;

    private boolean core;

    private boolean openData;

    private boolean common;

    private boolean isInProduction;

    private boolean isInBeta;

    private boolean isInPlayWithFint;

    public ComponentWithEntities() {
    }
    public List<Entity> entities;
}
