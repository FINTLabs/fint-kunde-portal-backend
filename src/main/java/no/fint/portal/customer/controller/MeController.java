package no.fint.portal.customer.controller;


import io.getunleash.Unleash;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.customer.exception.MissingNinException;
import no.fint.portal.customer.service.PortalApiService;
import no.fint.portal.exceptions.CreateEntityMismatchException;
import no.fint.portal.exceptions.EntityFoundException;
import no.fint.portal.exceptions.EntityNotFoundException;
import no.fint.portal.exceptions.UpdateEntityMismatchException;
import no.fint.portal.model.ErrorResponse;
import no.fint.portal.model.contact.Contact;
import no.fint.portal.model.organisation.OrganisationService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ldap.NameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.net.UnknownHostException;
import java.util.Collections;
import java.util.Optional;
import java.util.stream.Stream;

@Slf4j
@RestController
@Tag(name = "Me")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/me")
public class MeController {

    private final PortalApiService portalApiService;
    private final OrganisationService organisationService;
    private final Unleash unleashClient;

    public MeController(PortalApiService portalApiService, OrganisationService organisationService, Unleash unleashClient) {
        this.portalApiService = portalApiService;
        this.organisationService = organisationService;
        this.unleashClient = unleashClient;
    }


    @Operation(summary = "Get Me")
    @GetMapping
    public ResponseEntity<Contact> getMe(@RequestHeader(name = "x-nin") final String nin) {
        if (StringUtils.isEmpty(nin)) {
            log.error("x-nin is empty on calling getMe");
            throw new MissingNinException();
        }

        final Contact contact = portalApiService.getContact(nin);

        if (unleashClient.isEnabled("fint-kunde-portal.roles-init-new")
                && (contact.getRoles() == null || contact.getRoles().isEmpty())) {
            log.info("{} {} has no roles, adding ROLE_ADMIN for all organisations...", contact.getFirstName(), contact.getLastName());
            Stream.concat(contact.getLegal().stream(), contact.getTechnical().stream())
                    .map(organisationService::getOrganisationByDn)
                    .flatMap(Optional::stream)
                    .forEach(organisation -> {
                        organisationService.addRoles(organisation, contact, Collections.singletonList("ROLE_ADMIN"));
                        log.info("Added admin for {}", organisation.getDisplayName());
                    });
        }

        return ResponseEntity
                .ok()
                .cacheControl(CacheControl.noStore())
                .body(contact);

    }


    //
    // Exception handlers
    //
    @ExceptionHandler(UpdateEntityMismatchException.class)
    public ResponseEntity<ErrorResponse> handleUpdateEntityMismatch(Exception e) {
        return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFound(Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(CreateEntityMismatchException.class)
    public ResponseEntity<ErrorResponse> handleCreateEntityMismatch(Exception e) {
        return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(EntityFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityFound(Exception e) {
        return ResponseEntity.status(HttpStatus.FOUND).body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(NameNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNameNotFound(Exception e) {
        return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(UnknownHostException.class)
    public ResponseEntity<ErrorResponse> handleUnkownHost(Exception e) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(MissingNinException.class)
    public ResponseEntity<ErrorResponse> handleMissingNinException(Exception e) {
        return ResponseEntity.badRequest().body(new ErrorResponse("Nin is empty"));
    }

}
