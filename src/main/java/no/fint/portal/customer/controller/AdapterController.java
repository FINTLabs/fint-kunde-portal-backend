package no.fint.portal.customer.controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.customer.service.PortalApiService;
import no.fint.portal.exceptions.EntityFoundException;
import no.fint.portal.exceptions.EntityNotFoundException;
import no.fint.portal.exceptions.UpdateEntityMismatchException;
import no.fint.portal.model.ErrorResponse;
import no.fint.portal.model.adapter.Adapter;
import no.fint.portal.model.adapter.AdapterService;
import no.fint.portal.model.organisation.Organisation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ldap.NameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.UnknownHostException;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@Api(tags = "Adapters")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/adapters/{orgName}")
public class AdapterController {

  @Autowired
  PortalApiService portalApiService;

  @Autowired
  private AdapterService adapterService;

  @ApiOperation("Add adapter")
  @RequestMapping(
    method = RequestMethod.POST,
    consumes = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity addAdapter(@PathVariable("orgName") final String orgName,
                                   @RequestBody final Adapter adapter) {

    Organisation organisation = portalApiService.getOrganisation(orgName);

    Optional<Adapter> optionalAdapter = adapterService.getAdapter(adapter.getName(), orgName);
    if (!optionalAdapter.isPresent()) {
      if (adapterService.addAdapter(adapter, organisation)) {
        //return ResponseEntity.ok().body(adapter);
        return ResponseEntity.status(HttpStatus.CREATED).cacheControl(CacheControl.noStore()).body(adapter);
      }
    }

    throw new EntityFoundException(
      ServletUriComponentsBuilder
        .fromCurrentRequest().path("/{name}")
        .buildAndExpand(adapter.getName()).toUri().toString()
    );

  }

  @ApiOperation("Update adapter")
  @RequestMapping(method = RequestMethod.PUT,
    value = "/{adapterName}"
  )
  public ResponseEntity updateAdapter(@PathVariable final String orgName,
                                      @PathVariable final String adapterName,
                                      @RequestBody final Adapter adapter) {

    Organisation organisation = portalApiService.getOrganisation(orgName);
    Adapter original = portalApiService.getAdapter(organisation, adapterName);

    if (!adapterName.equals(adapter.getName())) {
      throw new UpdateEntityMismatchException(
        String.format("Adapter requested for update (%s) is not the same adapter in endpoint (%s).",
          adapter.getName(),
          adapterName)
      );
    }

    if (adapter.getNote()!=null)
      original.setNote(adapter.getNote());
    if (adapter.getShortDescription()!=null)
      original.setShortDescription(adapter.getShortDescription());

    if (!adapterService.updateAdapter(original)) {
      throw new EntityNotFoundException(String.format("Could not update adapter: %s", adapterName));
    }

    return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(original);

  }

  @ApiOperation("Reset adapter password")
  @RequestMapping(method = RequestMethod.PUT,
    value = "/{adapterName}/password",
    consumes = MediaType.TEXT_PLAIN_VALUE
  )
  public ResponseEntity resetAdapterPassword(@PathVariable final String orgName,
                                             @PathVariable final String adapterName,
                                             @RequestBody String newPassword) {

    Organisation organisation = portalApiService.getOrganisation(orgName);

    Adapter adapter = portalApiService.getAdapter(organisation, adapterName);
    adapterService.resetAdapterPassword(adapter, newPassword);
    return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(adapter);
  }

  @ApiOperation("Get all adapters")
  @RequestMapping(
    method = RequestMethod.GET
  )
  public ResponseEntity getAllAdapters(@PathVariable("orgName") final String orgName) {
    Organisation organisation = portalApiService.getOrganisation(orgName);

    List<Adapter> adapters = portalApiService.getAdapters(organisation);

    return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(adapters);
  }

  @ApiOperation("Get adapter")
  @RequestMapping(
    method = RequestMethod.GET,
    value = "/{adapterName}"
  )
  public ResponseEntity getAdapter(@PathVariable("orgName") final String orgName,
                                   @PathVariable final String adapterName) {
    Organisation organisation = portalApiService.getOrganisation(orgName);

    Adapter adapter = portalApiService.getAdapter(organisation, adapterName);
    return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(adapter);
  }

  @ApiOperation("Get Adapter OpenID Secret")
  @RequestMapping(
    method = RequestMethod.GET,
    value = "/{adapterName}/secret"
  )
  public ResponseEntity getAdapterSecret(@PathVariable("orgName") final String orgName,
                                         @PathVariable final String adapterName) {
    Organisation organisation = portalApiService.getOrganisation(orgName);
    Adapter adapter = portalApiService.getAdapter(organisation, adapterName);

    return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(adapterService.getAdapterSecret(adapter));
  }

  @ApiOperation("Delete adapter")
  @RequestMapping(method = RequestMethod.DELETE,
    value = "/{adapterName}"
  )
  public ResponseEntity deleteAdapter(@PathVariable("orgName") final String orgName,
                                      @PathVariable final String adapterName) {
    Organisation organisation = portalApiService.getOrganisation(orgName);
    Adapter adapter = portalApiService.getAdapter(organisation, adapterName);

    adapterService.deleteAdapter(adapter);
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
