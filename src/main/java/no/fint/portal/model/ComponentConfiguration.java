package no.fint.portal.model;

import lombok.Data;

import java.util.List;

@Data
public class ComponentConfiguration {
    private String name;
    private String path;
    private List<String> classes;
}
