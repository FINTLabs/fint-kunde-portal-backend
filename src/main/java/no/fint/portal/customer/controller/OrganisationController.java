package no.fint.portal.customer.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import no.fint.audit.FintAuditService;
import no.fint.event.model.Event;
import no.fint.event.model.Operation;
import no.fint.portal.customer.service.PortalApiService;
import no.fint.portal.exceptions.EntityFoundException;
import no.fint.portal.exceptions.EntityNotFoundException;
import no.fint.portal.exceptions.UpdateEntityMismatchException;
import no.fint.portal.model.ErrorResponse;
import no.fint.portal.model.asset.Asset;
import no.fint.portal.model.asset.AssetService;
import no.fint.portal.model.component.Component;
import no.fint.portal.model.contact.Contact;
import no.fint.portal.model.organisation.Organisation;
import no.fint.portal.model.organisation.OrganisationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ldap.NameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.net.UnknownHostException;
import java.util.List;
import java.util.Optional;

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

    @Autowired
    private AssetService assetService;

    @Autowired
    private FintAuditService fintAuditService;

    @GetMapping("/")
    @ApiOperation("Get Organisation")
    public ResponseEntity<Organisation> getOrganisationDetails(@PathVariable String orgName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);

        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(organisation);
    }

    @PutMapping("/")
    @ApiOperation("Update Organisation")
    public ResponseEntity<Organisation> updateOrganisation(
            @PathVariable String orgName,
            @RequestBody Organisation organisation,
            @RequestHeader(name = "x-nin") final String client,
            @RequestHeader(name = "x-source") final String source
    ) {
        Event<Organisation> event = new Event<>(organisation.getPrimaryAssetId(), "kundeportal", "ORGANISATION", client);
        event.setOperation(Operation.UPDATE);
        event.setQuery(orgName);
        event.setMessage(source);
        event.addData(organisation);
        Organisation original = portalApiService.getOrganisation(orgName);
        if (organisation.getDisplayName() != null)
            original.setDisplayName(organisation.getDisplayName());
        if (organisation.getOrgNumber() != null)
            original.setOrgNumber(organisation.getOrgNumber());

        organisationService.updateOrganisation(original);
        fintAuditService.audit(event);

        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(original);
    }


    @ApiOperation("Get primary asset")
    @GetMapping(value = "/asset/primary")
    public ResponseEntity<Asset> getOrganizationPrimaryAsset(@PathVariable String orgName) {
        Optional<Organisation> organisation = organisationService.getOrganisation(orgName);

        if (organisation.isPresent()) {
            Optional<Asset> primaryAsset = assetService.getAssets(organisation.get()).stream().filter(Asset::isPrimaryAsset).findFirst();
            if (primaryAsset.isPresent()) {
                return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(primaryAsset.get());
            }
            throw new EntityNotFoundException(
                    "Primary asset not present."
            );
        }

        throw new EntityNotFoundException(
                String.format("Organisation %s could not be found so we can't find any primary asset for it either ;)", orgName)
        );
    }

    @GetMapping("/contacts/legal")
    @ApiOperation("Get Legal Contact")
    public ResponseEntity<Contact> getLegalContact(@PathVariable String orgName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);

        Contact legalContact = organisationService.getLegalContact(organisation);
        if (legalContact == null) throw new EntityNotFoundException("Legal Contact not found");

        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(legalContact);
    }

    @PutMapping("/contacts/legal/{nin}")
    @ApiOperation("Set Legal Contact")
    public ResponseEntity<Void> linkLegalContact(
            @PathVariable String orgName,
            @PathVariable String nin,
            @RequestHeader(name = "x-nin") final String client,
            @RequestHeader(name = "x-source") final String source
    ) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Contact contact = portalApiService.getContact(nin);

        organisationService.linkLegalContact(organisation, contact);

        Event<Organisation> event = new Event<>(organisation.getPrimaryAssetId(), "kundeportal", "ORGANISATION_LEGAL_CONTACT", client);
        event.setOperation(Operation.CREATE);
        event.setQuery(orgName + "/" + nin);
        event.setMessage(source);
        event.addData(organisation);
        fintAuditService.audit(event);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    @DeleteMapping("/contacts/legal/{nin}")
    @ApiOperation("Unset Legal Contact")
    public ResponseEntity<Void> unLinkLegalContact(
            @PathVariable String orgName,
            @PathVariable String nin,
            @RequestHeader(name = "x-nin") final String client,
            @RequestHeader(name = "x-source") final String source
    ) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Contact contact = portalApiService.getContact(nin);

        organisationService.unLinkLegalContact(organisation, contact);

        Event<Organisation> event = new Event<>(organisation.getPrimaryAssetId(), "kundeportal", "ORGANISATION_LEGAL_CONTACT", client);
        event.setOperation(Operation.DELETE);
        event.setQuery(orgName + "/" + nin);
        event.setMessage(source);
        event.addData(organisation);
        fintAuditService.audit(event);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    @GetMapping("/contacts/technical")
    @ApiOperation("Get Technical Contacts")
    public ResponseEntity<List<Contact>> getTechnicalContacts(@PathVariable String orgName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        List<Contact> technicalContacts = organisationService.getTechnicalContacts(organisation);

        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(technicalContacts);
    }

    @PutMapping("/contacts/technical/{nin}")
    @ApiOperation("Add Technical Contact")
    public ResponseEntity<Void> linkTechnicalContact(
            @PathVariable String orgName,
            @PathVariable String nin,
            @RequestHeader(name = "x-nin") final String client,
            @RequestHeader(name = "x-source") final String source
    ) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Contact contact = portalApiService.getContact(nin);

        organisationService.linkTechnicalContact(organisation, contact);

        Event<Organisation> event = new Event<>(organisation.getPrimaryAssetId(), "kundeportal", "ORGANISATION_TECHNICAL_CONTACT", client);
        event.setOperation(Operation.CREATE);
        event.setQuery(orgName + "/" + nin);
        event.setMessage(source);
        event.addData(organisation);
        fintAuditService.audit(event);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    @DeleteMapping("/contacts/technical/{nin}")
    @ApiOperation("Remove Technical Contact")
    public ResponseEntity<Void> unLinkTechnicalContact(
            @PathVariable String orgName,
            @PathVariable String nin,
            @RequestHeader(name = "x-nin") final String client,
            @RequestHeader(name = "x-source") final String source
    ) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Contact contact = portalApiService.getContact(nin);

        organisationService.unLinkTechnicalContact(organisation, contact);

        Event<Organisation> event = new Event<>(organisation.getPrimaryAssetId(), "kundeportal", "ORGANISATION_TECHNICAL_CONTACT", client);
        event.setOperation(Operation.DELETE);
        event.setQuery(orgName + "/" + nin);
        event.setMessage(source);
        event.addData(organisation);
        fintAuditService.audit(event);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    @PutMapping("/components/{compName}")
    @ApiOperation("Link Component")
    public ResponseEntity<Void> linkComponent(
            @PathVariable String orgName,
            @PathVariable String compName,
            @RequestHeader(name = "x-nin") final String client,
            @RequestHeader(name = "x-source") final String source
    ) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Component component = portalApiService.getComponentByName(compName);

        organisationService.linkComponent(organisation, component);

        Event<Organisation> event = new Event<>(organisation.getPrimaryAssetId(), "kundeportal", "ORGANISATION_COMPONENT", client);
        event.setOperation(Operation.CREATE);
        event.setQuery(orgName + "/" + compName);
        event.setMessage(source);
        event.addData(organisation);
        fintAuditService.audit(event);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }


    @DeleteMapping("/components/{compName}")
    @ApiOperation("Unlink Component")
    public ResponseEntity<Void> unLinkComponent(
            @PathVariable String orgName,
            @PathVariable String compName,
            @RequestHeader(name = "x-nin") final String client,
            @RequestHeader(name = "x-source") final String source
    ) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Component component = portalApiService.getComponentByName(compName);

        organisationService.unLinkComponent(organisation, component);

        Event<Organisation> event = new Event<>(organisation.getPrimaryAssetId(), "kundeportal", "ORGANISATION_COMPONENT", client);
        event.setOperation(Operation.DELETE);
        event.setQuery(orgName + "/" + compName);
        event.setMessage(source);
        event.addData(organisation);
        fintAuditService.audit(event);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
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
