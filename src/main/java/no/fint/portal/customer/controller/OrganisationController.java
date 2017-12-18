package no.fint.portal.customer.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.exceptions.EntityNotFoundException;
import no.fint.portal.exceptions.UpdateEntityMismatchException;
import no.fint.portal.model.component.Component;
import no.fint.portal.model.component.ComponentService;
import no.fint.portal.model.contact.Contact;
import no.fint.portal.model.contact.ContactService;
import no.fint.portal.model.organisation.Organisation;
import no.fint.portal.model.organisation.OrganisationService;
import no.rogfk.hateoas.extension.HalPagedResources;
import no.rogfk.hateoas.extension.annotations.HalResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@Api(tags = "Organisations")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/organisations/{orgName}")
public class OrganisationController {

  @Autowired
  private OrganisationService organisationService;

  @Autowired
  private ContactService contactService;

  @Autowired
  private ComponentService componentService;

  @GetMapping("/")
  @ApiOperation("Get Organisation")
  public ResponseEntity getOrganisationDetails(@PathVariable String orgName) {
    Organisation organisation = getOrganisation(orgName);

    return ResponseEntity.ok(organisation);
  }

  @PutMapping("/")
  @ApiOperation("Update Organisation")
  public ResponseEntity updateOrganisation(@PathVariable String orgName,
                                           @RequestBody Organisation organisation) {
    if (!orgName.equals(organisation.getDn())) throw new UpdateEntityMismatchException(orgName);

    organisationService.updateOrganisation(organisation);

    return ResponseEntity.ok(organisation);
  }

  @GetMapping("/contacts/legal")
  @ApiOperation("Get Legal Contact")
  public ResponseEntity getLegalContact(@PathVariable String orgName) {
    Organisation organisation = getOrganisation(orgName);

    Contact legalContact = organisationService.getLegalContact(organisation);
    if (legalContact == null) throw new EntityNotFoundException("Legal Contact not found");

    return ResponseEntity.ok(legalContact);
  }

  @GetMapping("/contacts/technical")
  @ApiOperation("Get Technical Contacts")
  @HalResource(pageSize = 10)
  public HalPagedResources<Contact> getTechnicalContacts(@PathVariable String orgName,
                                                         @RequestParam(required = false) Integer page) {
    Organisation organisation = getOrganisation(orgName);
    List<Contact> technicalContacts = organisationService.getTechnicalContacts(organisation);

    return new HalPagedResources<>(technicalContacts, page);
  }

  @PutMapping("/contacts/legal/{nin}")
  @ApiOperation("Set Legal Contact")
  public ResponseEntity linkLegalContact(@PathVariable String orgName, @PathVariable String nin) {
    Organisation organisation = getOrganisation(orgName);
    Contact contact = getContact(nin);

    organisationService.linkLegalContact(organisation, contact);

    return ResponseEntity.noContent().build();
  }

  @DeleteMapping("/contacts/legal/{nin}")
  @ApiOperation("Unset Legal Contact")
  public ResponseEntity unLinkLegalContact(@PathVariable String orgName, @PathVariable String nin) {
    Organisation organisation = getOrganisation(orgName);
    Contact contact = getContact(nin);

    organisationService.unLinkLegalContact(organisation, contact);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/contacts/technical/{nin}")
  @ApiOperation("Add Technical Contact")
  public ResponseEntity linkTechnicalContact(@PathVariable String orgName, @PathVariable String nin) {
    Organisation organisation = getOrganisation(orgName);
    Contact contact = getContact(nin);

    organisationService.linkTechnicalContact(organisation, contact);

    return ResponseEntity.noContent().build();
  }

  @DeleteMapping("/contacts/technical/{nin}")
  @ApiOperation("Remove Technical Contact")
  public ResponseEntity unLinkTechnicalContact(@PathVariable String orgName, @PathVariable String nin) {
    Organisation organisation = getOrganisation(orgName);
    Contact contact = getContact(nin);

    return ResponseEntity.noContent().build();
  }

  @PutMapping("/components/{compName}")
  @ApiOperation("Link Component")
  public ResponseEntity linkComponent(@PathVariable String orgName, @PathVariable String compName) {
    Organisation organisation = getOrganisation(orgName);
    Component component = getComponent(compName);

    organisationService.linkComponent(organisation, component);

    return ResponseEntity.noContent().build();
  }


  @DeleteMapping("/components/{compName}")
  @ApiOperation("Unlink Component")
  public ResponseEntity unLinkComponent(@PathVariable String orgName, @PathVariable String compName) {
    Organisation organisation = getOrganisation(orgName);
    Component component = getComponent(compName);

    organisationService.unLinkComponent(organisation, component);

    return ResponseEntity.noContent().build();
  }

  private Organisation getOrganisation(String orgName) {
    return organisationService.getOrganisation(orgName).orElseThrow(() -> new EntityNotFoundException(orgName));
  }

  private Contact getContact(String nin) {
    return contactService.getContact(nin).orElseThrow(() -> new EntityNotFoundException(nin));
  }

  private Component getComponent(String compName) {
    return componentService.getComponentByName(compName).orElseThrow(() -> new EntityNotFoundException(compName));
  }

}
