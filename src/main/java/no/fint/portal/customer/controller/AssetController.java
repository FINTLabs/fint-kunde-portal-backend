package no.fint.portal.customer.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.exceptions.CreateEntityMismatchException;
import no.fint.portal.exceptions.EntityNotFoundException;
import no.fint.portal.exceptions.UpdateEntityMismatchException;
import no.fint.portal.model.adapter.Adapter;
import no.fint.portal.model.adapter.AdapterService;
import no.fint.portal.model.asset.Asset;
import no.fint.portal.model.asset.AssetService;
import no.fint.portal.model.client.Client;
import no.fint.portal.model.client.ClientService;
import no.fint.portal.model.organisation.Organisation;
import no.fint.portal.model.organisation.OrganisationService;
import no.rogfk.hateoas.extension.HalPagedResources;
import no.rogfk.hateoas.extension.annotations.HalResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Slf4j
@RestController
@Api(tags = "Assets")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/assets/{orgName}")
public class AssetController {

  @Autowired
  private OrganisationService organisationService;

  @Autowired
  private AssetService assetService;

  @Autowired
  private ClientService clientService;

  @Autowired
  private AdapterService adapterService;

  @ApiOperation("Get all Assets")
  @HalResource(pageSize = 10)
  @GetMapping("/")
  public HalPagedResources<Asset> getAssets(@PathVariable("orgName") String orgName,
                                            @RequestParam(required = false) Integer page) {
    Organisation organisation = getOrganisation(orgName);
    List<Asset> assets = assetService.getAssets(organisation);
    return new HalPagedResources<>(assets, page);
  }

  @ApiOperation("Create Asset")
  @PostMapping("/")
  public ResponseEntity addAsset(@PathVariable String orgName,
                                 @RequestBody Asset asset) {
    Organisation organisation = getOrganisation(orgName);

    if (!assetService.addAsset(asset, organisation)) throw new CreateEntityMismatchException(asset.getAssetId());

    return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequestUri().scheme(null).pathSegment(asset.getAssetId()).build().toUri()).build();
  }

  @ApiOperation("Get Asset by Name")
  @GetMapping("/{assetId}")
  public ResponseEntity getAssetByName(@PathVariable String orgName,
                                       @PathVariable String assetId) {
    Organisation organisation = getOrganisation(orgName);
    Asset asset = getAsset(organisation, assetId);
    return ResponseEntity.ok(asset);
  }

  @ApiOperation("Update Asset")
  @PutMapping("/{assetId}")
  public ResponseEntity updateAsset(@PathVariable String orgName,
                                    @PathVariable String assetId,
                                    @RequestBody Asset asset) {
    Organisation organisation = getOrganisation(orgName);
    if (!assetId.equals(asset.getAssetId())) throw new UpdateEntityMismatchException(assetId);

    assetService.updateAsset(asset);

    return ResponseEntity.ok(asset);
  }

  @ApiOperation("Delete Asset")
  @DeleteMapping("/{assetId}")
  public ResponseEntity removeAsset(@PathVariable String orgName,
                                    @PathVariable String assetId) {
    Organisation organisation = getOrganisation(orgName);
    Asset asset = getAsset(organisation, assetId);

    assetService.removeAsset(asset);

    return ResponseEntity.noContent().build();
  }

  @ApiOperation("Link Client to Asset")
  @PutMapping("/{assetId}/clients/{clientName}")
  public ResponseEntity linkClientToAsset(@PathVariable String orgName,
                                          @PathVariable String assetId,
                                          @PathVariable String clientName) {
    Organisation organisation = getOrganisation(orgName);
    Asset asset = getAsset(organisation, assetId);
    Client client = getClient(organisation, clientName);

    assetService.linkClientToAsset(asset, client);

    return ResponseEntity.noContent().build();
  }

  @ApiOperation("Unlink Client from Asset")
  @DeleteMapping("/{assetId}/clients/{clientName}")
  public ResponseEntity unlinkClientFromAsset(@PathVariable String orgName,
                                              @PathVariable String assetId,
                                              @PathVariable String clientName) {
    Organisation organisation = getOrganisation(orgName);
    Asset asset = getAsset(organisation, assetId);
    Client client = getClient(organisation, clientName);

    assetService.unlinkClientFromAsset(asset, client);

    return ResponseEntity.noContent().build();
  }

  @ApiOperation("Link Adapter to Asset")
  @PutMapping("/{assetId}/adapters/{adapterName}")
  public ResponseEntity linkAdapterToAsset(@PathVariable String orgName,
                                           @PathVariable String assetId,
                                           @PathVariable String adapterName) {
    Organisation organisation = getOrganisation(orgName);
    Asset asset = getAsset(organisation, assetId);
    Adapter adapter = getAdapter(organisation, adapterName);

    assetService.linkAdapterToAsset(asset, adapter);

    return ResponseEntity.noContent().build();
  }

  @ApiOperation("Unlink Adapter from Asset")
  @DeleteMapping("/{assetId}/adapters/{adapterName}")
  public ResponseEntity unlinkAdapterFromAsset(@PathVariable String orgName,
                                               @PathVariable String assetId,
                                               @PathVariable String adapterName) {
    Organisation organisation = getOrganisation(orgName);
    Asset asset = getAsset(organisation, assetId);
    Adapter adapter = getAdapter(organisation, adapterName);

    assetService.unlinkAdapterFromAsset(asset, adapter);

    return ResponseEntity.noContent().build();
  }


  private Organisation getOrganisation(String orgName) {
    return organisationService.getOrganisation(orgName).orElseThrow(() -> new EntityNotFoundException(orgName));
  }

  private Asset getAsset(Organisation organisation, String assetId) {
    return assetService.getAssets(organisation).stream().filter(a -> assetId.equals(a.getName())).findAny().orElseThrow(() -> new EntityNotFoundException(assetId));
  }

  private Client getClient(Organisation organisation, String clientName) {
    return clientService.getClient(clientName, organisation.getDn()).orElseThrow(() -> new EntityNotFoundException(clientName));
  }

  private Adapter getAdapter(Organisation organisation, String adapterName) {
    return adapterService.getAdapter(adapterName, organisation.getDn()).orElseThrow(() -> new EntityNotFoundException(adapterName));
  }

}
