package no.fint.portal.customer.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.customer.service.IdentityMaskingService;
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
import java.util.stream.Collectors;

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
    private IdentityMaskingService identityMaskingService;

    @GetMapping("/")
    @ApiOperation("Get Organisation")
    public ResponseEntity getOrganisationDetails(@PathVariable String orgName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(identityMaskingService.mask(organisation));
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

        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(original);
    }


    @ApiOperation("Get primary asset")
    @GetMapping(value = "/asset/primary")
    public ResponseEntity getOrganizationPrimaryAsset(@PathVariable String orgName) {
        Optional<Organisation> organisation = organisationService.getOrganisation(orgName);

        if (organisation.isPresent()) {
            Optional<Asset> primaryAsset = assetService.getAssets(organisation.get()).stream().filter(asset -> asset.isPrimaryAsset()).findFirst();
            if (primaryAsset.isPresent()) {
                return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(primaryAsset.get());
            }
            throw new EntityNotFoundException(
                    String.format("Primary asset not present.")
            );
        }

        throw new EntityNotFoundException(
                String.format("Organisation %s could not be found so we can't find any primary asset for it either ;)", orgName)
        );
    }

    @GetMapping("/contacts/legal")
    @ApiOperation("Get Legal Contact")
    public ResponseEntity getLegalContact(@PathVariable String orgName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);

        Contact legalContact = organisationService.getLegalContact(organisation);
        if (legalContact == null) throw new EntityNotFoundException("Legal Contact not found");

        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(identityMaskingService.mask(legalContact));
    }

    @PutMapping("/contacts/legal/{nin}")
    @ApiOperation("Set Legal Contact")
    public ResponseEntity linkLegalContact(@PathVariable String orgName, @PathVariable String nin) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Contact contact = portalApiService.getContact(identityMaskingService.unmask(nin));

        organisationService.linkLegalContact(organisation, contact);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    @DeleteMapping("/contacts/legal/{nin}")
    @ApiOperation("Unset Legal Contact")
    public ResponseEntity unLinkLegalContact(@PathVariable String orgName, @PathVariable String nin) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Contact contact = portalApiService.getContact(identityMaskingService.unmask(nin));

        organisationService.unLinkLegalContact(organisation, contact);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    @GetMapping("/contacts/technical")
    @ApiOperation("Get Technical Contacts")
    public ResponseEntity getTechnicalContacts(@PathVariable String orgName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        List<Contact> technicalContacts = organisationService.getTechnicalContacts(organisation).stream().map(identityMaskingService::mask).collect(Collectors.toList());

        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(technicalContacts);
    }

    @PutMapping("/contacts/technical/{nin}")
    @ApiOperation("Add Technical Contact")
    public ResponseEntity linkTechnicalContact(@PathVariable String orgName, @PathVariable String nin) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Contact contact = portalApiService.getContact(identityMaskingService.unmask(nin));

        organisationService.linkTechnicalContact(organisation, contact);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    @DeleteMapping("/contacts/technical/{nin}")
    @ApiOperation("Remove Technical Contact")
    public ResponseEntity unLinkTechnicalContact(@PathVariable String orgName, @PathVariable String nin) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Contact contact = portalApiService.getContact(identityMaskingService.unmask(nin));

        organisationService.unLinkTechnicalContact(organisation, contact);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    @PutMapping("/components/{compName}")
    @ApiOperation("Link Component")
    public ResponseEntity linkComponent(@PathVariable String orgName, @PathVariable String compName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Component component = portalApiService.getComponentByName(compName);

        organisationService.linkComponent(organisation, component);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }


    @DeleteMapping("/components/{compName}")
    @ApiOperation("Unlink Component")
    public ResponseEntity unLinkComponent(@PathVariable String orgName, @PathVariable String compName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Component component = portalApiService.getComponentByName(compName);

        organisationService.unLinkComponent(organisation, component);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    //
    // Exception handlers
    //
    @ExceptionHandler(UpdateEntityMismatchException.class)
    public ResponseEntity handleUpdateEntityMismatch(Exception e) {
        return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity handleEntityNotFound(Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(EntityFoundException.class)
    public ResponseEntity handleEntityFound(Exception e) {
        return ResponseEntity.status(HttpStatus.FOUND).body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(NameNotFoundException.class)
    public ResponseEntity handleNameNotFound(Exception e) {
        return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(UnknownHostException.class)
    public ResponseEntity handleUnkownHost(Exception e) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(new ErrorResponse(e.getMessage()));
    }


}
