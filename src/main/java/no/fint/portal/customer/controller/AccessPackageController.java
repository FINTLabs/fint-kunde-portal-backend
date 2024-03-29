package no.fint.portal.customer.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.customer.service.PortalApiService;
import no.fint.portal.exceptions.CreateEntityMismatchException;
import no.fint.portal.exceptions.UpdateEntityMismatchException;
import no.fint.portal.model.access.AccessPackage;
import no.fint.portal.model.access.AccessService;
import no.fint.portal.model.client.Client;
import no.fint.portal.model.organisation.Organisation;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@Slf4j
@RestController
@Tag(name = "Accesses")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/accesses/{orgName}")
public class AccessPackageController {

    private final PortalApiService portalApiService;

    private final AccessService accessService;

    public AccessPackageController(PortalApiService portalApiService, AccessService accessService) {
        this.portalApiService = portalApiService;
        this.accessService = accessService;
    }

    @Operation(summary = "Get all Accesses")
    @GetMapping("/")
    public ResponseEntity<List<AccessPackage>> getAccesses(@PathVariable("orgName") String orgName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        List<AccessPackage> accessPackages = portalApiService.getAccesses(organisation);
        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(accessPackages);
    }

    @Operation(summary = "Create Access")
    @PostMapping("/")
    public ResponseEntity<AccessPackage> addAccess(@PathVariable String orgName,
                                                   @RequestBody AccessPackage accessPackage) {
        Organisation organisation = portalApiService.getOrganisation(orgName);

        if (!accessService.addAccess(accessPackage, organisation))
            throw new CreateEntityMismatchException(accessPackage.getName());

        return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequestUri().scheme(null).pathSegment(accessPackage.getName()).build().toUri()).cacheControl(CacheControl.noStore()).body(accessPackage);
    }

    @Operation(summary = "Get Access by Name")
    @GetMapping("/{accessId}")
    public ResponseEntity<AccessPackage> getAccessByName(@PathVariable String orgName,
                                                         @PathVariable String accessId) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        AccessPackage accessPackage = portalApiService.getAccess(organisation, accessId);
        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(accessPackage);
    }

    @Operation(summary = "Update Access")
    @PutMapping("/{accessId}")
    public ResponseEntity<AccessPackage> updateAccess(@PathVariable String orgName,
                                                      @PathVariable String accessId,
                                                      @RequestBody AccessPackage accessPackage) {
        if (!accessId.equals(accessPackage.getName())) throw new UpdateEntityMismatchException(accessId);
        Organisation organisation = portalApiService.getOrganisation(orgName);
        AccessPackage original = portalApiService.getAccess(organisation, accessId);

        if (accessPackage.getComponents() != null) {
            original.setComponents(accessPackage.getComponents());
        }
        if (accessPackage.getClients() != null) {
            original.setClients(accessPackage.getClients());
        }
        if (accessPackage.getCollection() != null) {
            original.setCollection(accessPackage.getCollection());
        }
        if (accessPackage.getModify() != null) {
            original.setModify(accessPackage.getModify());
        }
        if (accessPackage.getRead() != null) {
            original.setRead(accessPackage.getRead());
        }

        if (!accessService.updateAccess(original)) throw new UpdateEntityMismatchException(accessId);

        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(accessPackage);
    }

    @Operation(summary = "Delete Access")
    @DeleteMapping("/{accessId}")
    public ResponseEntity<Void> removeAccess(@PathVariable String orgName,
                                             @PathVariable String accessId) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        AccessPackage accessPackage = portalApiService.getAccess(organisation, accessId);

        accessService.removeAccess(accessPackage);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    @Operation(summary = "Link Client to Access")
    @PutMapping("/{accessId}/clients/{clientName}")
    public ResponseEntity<Void> linkClientToAccess(@PathVariable String orgName,
                                                   @PathVariable String accessId,
                                                   @PathVariable String clientName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        AccessPackage accessPackage = portalApiService.getAccess(organisation, accessId);
        Client client = portalApiService.getClient(organisation, clientName);

        accessService.linkClientToAccess(accessPackage, client);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    @Operation(summary = "Unlink Client from Access")
    @DeleteMapping("/{accessId}/clients/{clientName}")
    public ResponseEntity<Void> unlinkClientFromAccess(@PathVariable String orgName,
                                                       @PathVariable String accessId,
                                                       @PathVariable String clientName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        AccessPackage accessPackage = portalApiService.getAccess(organisation, accessId);
        Client client = portalApiService.getClient(organisation, clientName);

        accessService.unlinkClientFromAccess(accessPackage, client);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }
}
