package no.fint.portal.customer.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.customer.service.IdentityMaskingService;
import no.fint.portal.customer.service.PortalApiService;
import no.fint.portal.exceptions.*;
import no.fint.portal.model.ErrorResponse;
import no.fint.portal.model.contact.Contact;
import no.fint.portal.model.contact.ContactService;
import no.fint.portal.model.organisation.Organisation;
import no.fint.portal.model.organisation.OrganisationService;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ldap.NameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.net.UnknownHostException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@RestController
@Api(tags = "Contacts")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/contacts")
public class ContactController {

    final PortalApiService portalApiService;
    final OrganisationService organisationService;
    private final ContactService contactService;
    private final IdentityMaskingService identityMaskingService;

    public ContactController(PortalApiService portalApiService, OrganisationService organisationService, ContactService contactService, IdentityMaskingService identityMaskingService) {
        this.portalApiService = portalApiService;
        this.organisationService = organisationService;
        this.contactService = contactService;
        this.identityMaskingService = identityMaskingService;
    }

    @ApiOperation("Get all contacts")
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Contact>> getContacts() {
        var contacts = identityMaskingService.getMaskedContacts();

        if (contacts != null) {
            return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(contacts);
        }

        throw new EntityNotFoundException("No contacts found.");
    }

    @ApiOperation("Get contact's organisations")
    @GetMapping(value = "/organisations")
    public ResponseEntity<List<Organisation>> getContactOrganisations(@RequestHeader(value = "x-nin") final String nin) {
        var contact = contactService.getContact(nin).orElseThrow(() -> new EntityNotFoundException("Contact not found"));
        var contactOrganisations = Stream.concat(contact.getLegal().stream(), contact.getTechnical()
                .stream())
                .map(organisationService::getOrganisationByDn)
                .flatMap(Optional::stream)
                .map(identityMaskingService::mask)
                .distinct()
                .collect(Collectors.toList());
        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(contactOrganisations);
    }

    //
    // Exception handlers
    //
    @ExceptionHandler(UpdateEntityMismatchException.class)
    public ResponseEntity<ErrorResponse> handleUpdateEntityMismatch(Exception e) {
        return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(UpdateEntityException.class)
    public ResponseEntity<ErrorResponse> handleUpdateEntity(Exception e) {
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

}
