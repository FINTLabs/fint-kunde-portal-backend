package no.fint.portal.customer.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.customer.service.PortalApiService;
import no.fint.portal.exceptions.CreateEntityMismatchException;
import no.fint.portal.exceptions.UpdateEntityMismatchException;
import no.fint.portal.model.adapter.Adapter;
import no.fint.portal.model.asset.Asset;
import no.fint.portal.model.asset.AssetService;
import no.fint.portal.model.client.Client;
import no.fint.portal.model.organisation.Organisation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@Slf4j
@RestController
@Api(tags = "Assets")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/assets/{orgName}")
public class AssetController {

  @Autowired
  PortalApiService portalApiService;

  @Autowired
  private AssetService assetService;

  @ApiOperation("Get all Assets")
  @GetMapping("/")
  public ResponseEntity getAssets(@PathVariable("orgName") String orgName) {
    Organisation organisation = portalApiService.getOrganisation(orgName);
    List<Asset> assets = portalApiService.getAssets(organisation);
    return ResponseEntity.ok(assets);
  }

  @ApiOperation("Create Asset")
  @PostMapping("/")
  public ResponseEntity addAsset(@PathVariable String orgName,
                                 @RequestBody Asset asset) {
    Organisation organisation = portalApiService.getOrganisation(orgName);

    Asset primaryAsset = assetService.getPrimaryAsset(organisation);
    // TODO: 31/07/2018 This should be moved to the portal-api
    asset.setAssetId(String.format("%s.%s", asset.getAssetId(), primaryAsset.getAssetId()));

    if (!assetService.addAsset(asset, organisation)) throw new CreateEntityMismatchException(asset.getAssetId());

    return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequestUri().scheme(null).pathSegment(asset.getName()).build().toUri()).build();
  }

  @ApiOperation("Get Asset by Name")
  @GetMapping("/{assetId}")
  public ResponseEntity getAssetByName(@PathVariable String orgName,
                                       @PathVariable String assetId) {
    Organisation organisation = portalApiService.getOrganisation(orgName);
    Asset asset = portalApiService.getAsset(organisation, assetId);
    return ResponseEntity.ok(asset);
  }

  @ApiOperation("Update Asset")
  @PutMapping("/{assetId}")
  public ResponseEntity updateAsset(@PathVariable String orgName,
                                    @PathVariable String assetId,
                                    @RequestBody Asset asset) {
    Organisation organisation = portalApiService.getOrganisation(orgName);
    Asset original = portalApiService.getAsset(organisation, assetId);
    if (!assetId.equals(asset.getName())) throw new UpdateEntityMismatchException(assetId);

    if (asset.getDescription()!=null)
      original.setDescription(asset.getDescription());

    assetService.updateAsset(original);

    return ResponseEntity.ok(original);
  }

  @ApiOperation("Delete Asset")
  @DeleteMapping("/{assetId}")
  public ResponseEntity removeAsset(@PathVariable String orgName,
                                    @PathVariable String assetId) {
    Organisation organisation = portalApiService.getOrganisation(orgName);
    Asset asset = portalApiService.getAsset(organisation, assetId);

    assetService.removeAsset(asset);

    return ResponseEntity.noContent().build();
  }

  @ApiOperation("Link Client to Asset")
  @PutMapping("/{assetId}/clients/{clientName}")
  public ResponseEntity linkClientToAsset(@PathVariable String orgName,
                                          @PathVariable String assetId,
                                          @PathVariable String clientName) {
    Organisation organisation = portalApiService.getOrganisation(orgName);
    Asset asset = portalApiService.getAsset(organisation, assetId);
    Client client = portalApiService.getClient(organisation, clientName);

    assetService.linkClientToAsset(asset, client);

    return ResponseEntity.noContent().build();
  }

  @ApiOperation("Unlink Client from Asset")
  @DeleteMapping("/{assetId}/clients/{clientName}")
  public ResponseEntity unlinkClientFromAsset(@PathVariable String orgName,
                                              @PathVariable String assetId,
                                              @PathVariable String clientName) {
    Organisation organisation = portalApiService.getOrganisation(orgName);
    Asset asset = portalApiService.getAsset(organisation, assetId);
    Client client = portalApiService.getClient(organisation, clientName);

    assetService.unlinkClientFromAsset(asset, client);

    return ResponseEntity.noContent().build();
  }

  @ApiOperation("Link Adapter to Asset")
  @PutMapping("/{assetId}/adapters/{adapterName}")
  public ResponseEntity linkAdapterToAsset(@PathVariable String orgName,
                                           @PathVariable String assetId,
                                           @PathVariable String adapterName) {
    Organisation organisation = portalApiService.getOrganisation(orgName);
    Asset asset = portalApiService.getAsset(organisation, assetId);
    Adapter adapter = portalApiService.getAdapter(organisation, adapterName);

    assetService.linkAdapterToAsset(asset, adapter);

    return ResponseEntity.noContent().build();
  }

  @ApiOperation("Unlink Adapter from Asset")
  @DeleteMapping("/{assetId}/adapters/{adapterName}")
  public ResponseEntity unlinkAdapterFromAsset(@PathVariable String orgName,
                                               @PathVariable String assetId,
                                               @PathVariable String adapterName) {
    Organisation organisation = portalApiService.getOrganisation(orgName);
    Asset asset = portalApiService.getAsset(organisation, assetId);
    Adapter adapter = portalApiService.getAdapter(organisation, adapterName);

    assetService.unlinkAdapterFromAsset(asset, adapter);

    return ResponseEntity.noContent().build();
  }


}
