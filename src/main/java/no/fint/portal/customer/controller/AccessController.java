package no.fint.portal.customer.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.customer.service.PortalApiService;
import no.fint.portal.exceptions.CreateEntityMismatchException;
import no.fint.portal.exceptions.UpdateEntityMismatchException;
import no.fint.portal.model.access.Access;
import no.fint.portal.model.access.AccessService;
import no.fint.portal.model.client.Client;
import no.fint.portal.model.organisation.Organisation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@Slf4j
@RestController
@Api(tags = "Accesses")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/accesses/{orgName}")
public class AccessController {

    @Autowired
    PortalApiService portalApiService;

    @Autowired
    private AccessService accessService;

    @ApiOperation("Get all Accesses")
    @GetMapping("/")
    public ResponseEntity<List<Access>> getAccesses(@PathVariable("orgName") String orgName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        List<Access> accesses = portalApiService.getAccesses(organisation);
        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(accesses);
    }

    @ApiOperation("Create Access")
    @PostMapping("/")
    public ResponseEntity<Access> addAccess(@PathVariable String orgName,
                                   @RequestBody Access access) {
        Organisation organisation = portalApiService.getOrganisation(orgName);

        if (!accessService.addAccess(access, organisation)) throw new CreateEntityMismatchException(access.getName());

        return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequestUri().scheme(null).pathSegment(access.getName()).build().toUri()).cacheControl(CacheControl.noStore()).body(access);
    }

    @ApiOperation("Get Access by Name")
    @GetMapping("/{accessId}")
    public ResponseEntity<Access> getAccessByName(@PathVariable String orgName,
                                         @PathVariable String accessId) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Access access = portalApiService.getAccess(organisation, accessId);
        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(access);
    }

    @ApiOperation("Update Access")
    @PutMapping("/{accessId}")
    public ResponseEntity<Access> updateAccess(@PathVariable String orgName,
                                      @PathVariable String accessId,
                                      @RequestBody Access access) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Access original = portalApiService.getAccess(organisation, accessId);
        if (!accessId.equals(access.getName())) throw new UpdateEntityMismatchException(accessId);

        original.setCollection(access.getCollection());
        original.setModify(access.getModify());
        original.setRead(access.getRead());
        if (!accessService.updateAccess(original)) throw new UpdateEntityMismatchException(accessId);

        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(original);
    }

    @ApiOperation("Delete Access")
    @DeleteMapping("/{accessId}")
    public ResponseEntity<Void> removeAccess(@PathVariable String orgName,
                                      @PathVariable String accessId) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Access access = portalApiService.getAccess(organisation, accessId);

        accessService.removeAccess(access);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    @ApiOperation("Link Client to Access")
    @PutMapping("/{accessId}/clients/{clientName}")
    public ResponseEntity<Void> linkClientToAccess(@PathVariable String orgName,
                                            @PathVariable String accessId,
                                            @PathVariable String clientName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Access access = portalApiService.getAccess(organisation, accessId);
        Client client = portalApiService.getClient(organisation, clientName);

        accessService.linkClientToAccess(access, client);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    @ApiOperation("Unlink Client from Access")
    @DeleteMapping("/{accessId}/clients/{clientName}")
    public ResponseEntity<Void> unlinkClientFromAccess(@PathVariable String orgName,
                                                @PathVariable String accessId,
                                                @PathVariable String clientName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Access access = portalApiService.getAccess(organisation, accessId);
        Client client = portalApiService.getClient(organisation, clientName);

        accessService.unlinkClientFromAccess(access, client);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    /*

    @ApiOperation("Link Adapter to Access")
    @PutMapping("/{accessId}/adapters/{adapterName}")
    public ResponseEntity linkAdapterToAccess(@PathVariable String orgName,
                                             @PathVariable String accessId,
                                             @PathVariable String adapterName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Access access = portalApiService.getAccess(organisation, accessId);
        Adapter adapter = portalApiService.getAdapter(organisation, adapterName);

        accessService.linkAdapterToAccess(access, adapter);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    @ApiOperation("Unlink Adapter from Access")
    @DeleteMapping("/{accessId}/adapters/{adapterName}")
    public ResponseEntity unlinkAdapterFromAccess(@PathVariable String orgName,
                                                 @PathVariable String accessId,
                                                 @PathVariable String adapterName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Access access = portalApiService.getAccess(organisation, accessId);
        Adapter adapter = portalApiService.getAdapter(organisation, adapterName);

        accessService.unlinkAdapterFromAccess(access, adapter);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }
     */


}
