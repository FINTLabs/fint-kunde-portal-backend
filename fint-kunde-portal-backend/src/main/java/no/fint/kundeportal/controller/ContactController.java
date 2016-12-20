package no.fint.kundeportal.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import no.fint.kundeportal.model.Contact;
import no.fint.kundeportal.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@Slf4j
@RestController
@Api(tags = "Contacts")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/contacts")
public class ContactController {

    @Autowired
    ContactService contactService;

    @ApiOperation("Request new contact")
    @RequestMapping(method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity createOrganization(@ModelAttribute Contact contact) {
        log.info("Contact: {}", contact);

        boolean contactCreated = contactService.createContact(contact);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{nin}")
                .buildAndExpand(contact.getNin().concat("@").concat(contact.getOrgId())).toUri();

        if (contactCreated) {
            return ResponseEntity.created(location).build();
        } else {
            return ResponseEntity.status(HttpStatus.FOUND)
                    .body(location.toString());
        }
    }

    @ApiOperation("Getting contact by national identification number (nin) + realm (orgId)")
    @RequestMapping(method = RequestMethod.GET, value = "/{ninRealm:.+}")
    public ResponseEntity getOrganization(@PathVariable String ninRealm) {
        Optional<Contact> contact = contactService.getContact(ninRealm);

        if (contact.isPresent()) {
            return ResponseEntity.ok(contact.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
