package no.fint.portal.security;

import lombok.Data;

@Data
public class User {
    private String id;
    private String[] organizations;
}
