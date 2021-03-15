package no.fint.portal.customer.controller;

import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import no.finn.unleash.Unleash;
import no.fint.portal.customer.service.RoleConfig;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@Api(tags = "Roles")
//@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/role")
public class RoleController {

    private final RoleConfig roleConfig;
    private final Unleash unleashClient;

    public RoleController(RoleConfig roleConfig, Unleash unleashClient) {
        this.roleConfig = roleConfig;
        this.unleashClient = unleashClient;
    }

    @GetMapping
    public ResponseEntity<List<RoleConfig.Role>> getRoles() {
        if (unleashClient.isEnabled("fint-kunde-portal.roles")) {
            return ResponseEntity.ok(roleConfig.getRoles());
        }
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }
}
