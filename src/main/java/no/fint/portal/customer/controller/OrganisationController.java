package no.fint.portal.customer.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.customer.service.PortalApiService;
import no.fint.portal.exceptions.EntityNotFoundException;
import no.fint.portal.model.component.Component;
import no.fint.portal.model.contact.Contact;
import no.fint.portal.model.organisation.Organisation;
import no.fint.portal.model.organisation.OrganisationService;
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
  PortalApiService portalApiService;

  @Autowired
  private OrganisationService organisationService;

  @GetMapping("/")
  @ApiOperation("Get Organisation")
  public ResponseEntity getOrganisationDetails(@PathVariable String orgName) {
    Organisation organisation = portalApiService.getOrganisation(orgName);

    return ResponseEntity.ok(organisation);
  }

  @PutMapping("/")
  @ApiOperation("Update Organisation")
  public ResponseEntity updateOrganisation(@PathVariable String orgName,
                                           @RequestBody Organisation organisation) {
    Organisation original = portalApiService.getOrganisation(orgName);
    if (organisation.getDisplayName() != null)
      original.setDisplayName(organisation.getDisplayName());
    if (organisation.getOrgNumber() != null)
      original.setOrgNumber(organisation.getOrgNumber());

    organisationService.updateOrganisation(original);

    return ResponseEntity.ok(original);
  }

  @GetMapping("/contacts/legal")
  @ApiOperation("Get Legal Contact")
  public ResponseEntity getLegalContact(@PathVariable String orgName) {
    Organisation organisation = portalApiService.getOrganisation(orgName);

    Contact legalContact = organisationService.getLegalContact(organisation);
    if (legalContact == null) throw new EntityNotFoundException("Legal Contact not found");

    return ResponseEntity.ok(legalContact);
  }

  @PutMapping("/contacts/legal/{nin}")
  @ApiOperation("Set Legal Contact")
  public ResponseEntity linkLegalContact(@PathVariable String orgName, @PathVariable String nin) {
    Organisation organisation = portalApiService.getOrganisation(orgName);
    Contact contact = portalApiService.getContact(nin);

    organisationService.linkLegalContact(organisation, contact);

    return ResponseEntity.noContent().build();
  }

  @DeleteMapping("/contacts/legal/{nin}")
  @ApiOperation("Unset Legal Contact")
  public ResponseEntity unLinkLegalContact(@PathVariable String orgName, @PathVariable String nin) {
    Organisation organisation = portalApiService.getOrganisation(orgName);
    Contact contact = portalApiService.getContact(nin);

    organisationService.unLinkLegalContact(organisation, contact);

    return ResponseEntity.noContent().build();
  }

  @GetMapping("/contacts/technical")
  @ApiOperation("Get Technical Contacts")
  public ResponseEntity getTechnicalContacts(@PathVariable String orgName) {
    Organisation organisation = portalApiService.getOrganisation(orgName);
    List<Contact> technicalContacts = organisationService.getTechnicalContacts(organisation);

    return ResponseEntity.ok(technicalContacts);
  }

  @PutMapping("/contacts/technical/{nin}")
  @ApiOperation("Add Technical Contact")
  public ResponseEntity linkTechnicalContact(@PathVariable String orgName, @PathVariable String nin) {
    Organisation organisation = portalApiService.getOrganisation(orgName);
    Contact contact = portalApiService.getContact(nin);

    organisationService.linkTechnicalContact(organisation, contact);

    return ResponseEntity.noContent().build();
  }

  @DeleteMapping("/contacts/technical/{nin}")
  @ApiOperation("Remove Technical Contact")
  public ResponseEntity unLinkTechnicalContact(@PathVariable String orgName, @PathVariable String nin) {
    Organisation organisation = portalApiService.getOrganisation(orgName);
    Contact contact = portalApiService.getContact(nin);

    organisationService.unLinkTechnicalContact(organisation, contact);

    return ResponseEntity.noContent().build();
  }

  @PutMapping("/components/{compName}")
  @ApiOperation("Link Component")
  public ResponseEntity linkComponent(@PathVariable String orgName, @PathVariable String compName) {
    Organisation organisation = portalApiService.getOrganisation(orgName);
    Component component = portalApiService.getComponent(compName);

    organisationService.linkComponent(organisation, component);

    return ResponseEntity.noContent().build();
  }


  @DeleteMapping("/components/{compName}")
  @ApiOperation("Unlink Component")
  public ResponseEntity unLinkComponent(@PathVariable String orgName, @PathVariable String compName) {
    Organisation organisation = portalApiService.getOrganisation(orgName);
    Component component = portalApiService.getComponent(compName);

    organisationService.unLinkComponent(organisation, component);

    return ResponseEntity.noContent().build();
  }

}
