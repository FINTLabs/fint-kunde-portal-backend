package no.fint.portal.customer.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.customer.service.PortalApiService;
import no.fint.portal.exceptions.UpdateEntityMismatchException;
import no.fint.portal.model.ErrorResponse;
import no.fint.portal.model.adapter.Adapter;
import no.fint.portal.model.asset.Asset;
import no.fint.portal.model.asset.AssetService;
import no.fint.portal.model.client.Client;
import no.fint.portal.model.organisation.Organisation;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@Slf4j
@RestController
@Tag(name = "Assets")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/assets/{orgName}")
public class AssetController {

    final
    PortalApiService portalApiService;

    private final AssetService assetService;

    public AssetController(PortalApiService portalApiService, AssetService assetService) {
        this.portalApiService = portalApiService;
        this.assetService = assetService;
    }

    @Operation(summary = "Get all Assets")
    @GetMapping("/")
    public ResponseEntity<List<Asset>> getAssets(@PathVariable("orgName") String orgName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        List<Asset> assets = portalApiService.getAssets(organisation);
        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(assets);
    }

    @Operation(summary = "Get Primary Asset ID")
    @GetMapping("/primary")
    public ResponseEntity<Asset> getPrimaryAsset(@PathVariable("orgName") String orgName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Asset primaryAsset = assetService.getPrimaryAsset(organisation);

        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(primaryAsset);

    }

    @Operation(summary = "Create Asset")
    @PostMapping("/")
    public ResponseEntity<Asset> addAsset(@PathVariable String orgName,
                                          @RequestBody Asset asset) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        assetService.addSubAsset(asset, organisation);
        return ResponseEntity.created(
                ServletUriComponentsBuilder.fromCurrentRequestUri().scheme(null).pathSegment(asset.getName()).build().toUri()
        ).cacheControl(CacheControl.noStore()).body(asset);
    }

    @Operation(summary = "Get Asset by Name")
    @GetMapping("/{assetId}")
    public ResponseEntity<Asset> getAssetByName(@PathVariable String orgName,
                                                @PathVariable String assetId) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Asset asset = portalApiService.getAsset(organisation, assetId);
        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(asset);
    }

    @Operation(summary = "Update Asset")
    @PutMapping("/{assetId}")
    public ResponseEntity<Asset> updateAsset(@PathVariable String orgName,
                                             @PathVariable String assetId,
                                             @RequestBody Asset asset) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Asset original = portalApiService.getAsset(organisation, assetId);
        if (!assetId.equals(asset.getName())) throw new UpdateEntityMismatchException(assetId);

        if (asset.getDescription() != null)
            original.setDescription(asset.getDescription());

        assetService.updateAsset(original);

        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(original);
    }

    @Operation(summary = "Delete Asset")
    @DeleteMapping("/{assetId}")
    public ResponseEntity<Void> removeAsset(@PathVariable String orgName,
                                            @PathVariable String assetId) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Asset asset = portalApiService.getAsset(organisation, assetId);

        assetService.removeAsset(asset);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    @Operation(summary = "Link Client to Asset")
    @PutMapping("/{assetId}/clients/{clientName}")
    public ResponseEntity<Void> linkClientToAsset(@PathVariable String orgName,
                                                  @PathVariable String assetId,
                                                  @PathVariable String clientName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Asset asset = portalApiService.getAsset(organisation, assetId);
        Client client = portalApiService.getClient(organisation, clientName);

        assetService.linkClientToAsset(asset, client);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    @Operation(summary = "Unlink Client from Asset")
    @DeleteMapping("/{assetId}/clients/{clientName}")
    public ResponseEntity<Void> unlinkClientFromAsset(@PathVariable String orgName,
                                                      @PathVariable String assetId,
                                                      @PathVariable String clientName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Asset asset = portalApiService.getAsset(organisation, assetId);
        Client client = portalApiService.getClient(organisation, clientName);

        assetService.unlinkClientFromAsset(asset, client);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    @Operation(summary = "Link Adapter to Asset")
    @PutMapping("/{assetId}/adapters/{adapterName}")
    public ResponseEntity<Void> linkAdapterToAsset(@PathVariable String orgName,
                                                   @PathVariable String assetId,
                                                   @PathVariable String adapterName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Asset asset = portalApiService.getAsset(organisation, assetId);
        Adapter adapter = portalApiService.getAdapter(organisation, adapterName);

        assetService.linkAdapterToAsset(asset, adapter);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    @Operation(summary = "Unlink Adapter from Asset")
    @DeleteMapping("/{assetId}/adapters/{adapterName}")
    public ResponseEntity<Void> unlinkAdapterFromAsset(@PathVariable String orgName,
                                                       @PathVariable String assetId,
                                                       @PathVariable String adapterName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Asset asset = portalApiService.getAsset(organisation, assetId);
        Adapter adapter = portalApiService.getAdapter(organisation, adapterName);

        assetService.unlinkAdapterFromAsset(asset, adapter);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(Exception e) {
        return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
    }
}
