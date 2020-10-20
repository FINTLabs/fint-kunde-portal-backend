package no.fint.portal.security;

import lombok.Data;

import java.util.Collections;
import java.util.List;

@Data
public class User {
    private String id;
    private List<String> organizations = Collections.emptyList();
}
