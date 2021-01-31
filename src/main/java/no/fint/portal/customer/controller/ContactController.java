package no.fint.portal.customer.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.customer.service.IdentityMaskingService;
import no.fint.portal.customer.service.PortalApiService;
import no.fint.portal.exceptions.CreateEntityMismatchException;
import no.fint.portal.exceptions.EntityFoundException;
import no.fint.portal.exceptions.EntityNotFoundException;
import no.fint.portal.exceptions.UpdateEntityMismatchException;
import no.fint.portal.model.ErrorResponse;
import no.fint.portal.model.contact.Contact;
import no.fint.portal.model.contact.ContactService;
import no.fint.portal.model.organisation.Organisation;
import no.fint.portal.model.organisation.OrganisationService;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ldap.NameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.UnknownHostException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static no.fint.portal.customer.service.IdentityMaskingService.BULLETS;

@Slf4j
@RestController
@Api(tags = "Contacts")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/contacts")
public class ContactController {

    final
    PortalApiService portalApiService;
    final
    OrganisationService organisationService;
    private final ContactService contactService;
    private final IdentityMaskingService identityMaskingService;

    public ContactController(PortalApiService portalApiService, OrganisationService organisationService, ContactService contactService, IdentityMaskingService identityMaskingService) {
        this.portalApiService = portalApiService;
        this.organisationService = organisationService;
        this.contactService = contactService;
        this.identityMaskingService = identityMaskingService;
    }

    @ApiOperation("Create new contact")
    @RequestMapping(method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Contact> createContact(@RequestBody final Contact contact) {
        if (!contactService.addContact(contact)) {
            throw new EntityFoundException(
                    ServletUriComponentsBuilder
                            .fromCurrentRequest().path("/{nin}")
                            .buildAndExpand(contact.getNin()).toUri().toString()
            );
        }
        return ResponseEntity.status(HttpStatus.CREATED).cacheControl(CacheControl.noStore()).body(contact);
    }

    @ApiOperation("Update contact")
    @RequestMapping(method = RequestMethod.PUT,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            value = "/{nin}"
    )
    public ResponseEntity<Contact> updateContact(@RequestBody final Contact contact, @PathVariable final String nin) {
        if (!nin.equals(contact.getNin())) {
            throw new UpdateEntityMismatchException("The contact to updateEntry is not the contact in endpoint.");
        }
        Contact original = portalApiService.getContact(identityMaskingService.unmask(nin));
        if (contact.getFirstName() != null)
            original.setFirstName(contact.getFirstName());
        if (contact.getLastName() != null)
            original.setLastName(contact.getLastName());
        if (contact.getMail() != null && !BULLETS.equals(contact.getMail()))
            original.setMail(contact.getMail());
        if (contact.getMobile() != null && !BULLETS.equals(contact.getMobile()))
            original.setMobile(contact.getMobile());

        if (!contactService.updateContact(original)) {
            throw new EntityNotFoundException(String.format("Could not find contact: %s", nin));
        }

        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(original);
    }

    @ApiOperation("Get all contacts")
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Contact>> getContacts() {
        List<Contact> contacts = identityMaskingService.getMaskedContacts();

        if (contacts != null) {
            return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(contacts);
        }

        throw new EntityNotFoundException("No contacts found.");
    }

    /* TODO Removed for identity masking reasons
    @ApiOperation("Get contact by nin")
    @RequestMapping(method = RequestMethod.GET, value = "/{nin}")
    public ResponseEntity getContact(@PathVariable final String nin) {
        Contact contact = portalApiService.getContact(nin);
        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(contact);
    }

     */

    /* TODO Removed for security reasons.
    @ApiOperation("Delete a contact")
    @RequestMapping(method = RequestMethod.DELETE, value = "/{nin}")
    public ResponseEntity deleteContacts(@PathVariable final String nin) {
        Contact contact = portalApiService.getContact(nin);

        contactService.deleteContact(contact);
        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }
    */

    @ApiOperation("Get contact's organisations")
    @GetMapping(value = "/organisations")
    public ResponseEntity<List<Organisation>> getContactOrganisations(@RequestHeader(value = "x-nin") final String nin) {
        Contact contact = contactService.getContact(nin).orElseThrow(() -> new EntityNotFoundException("Contact not found"));
        List<Organisation> contactOrganisations = Stream.concat(contact.getLegal().stream(), contact.getTechnical()
                .stream())
                .map(organisationService::getOrganisationByDn)
                .filter(Optional::isPresent).map(Optional::get)
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
