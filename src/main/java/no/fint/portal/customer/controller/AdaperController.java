package no.fint.portal.customer.controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.exceptions.EntityFoundException;
import no.fint.portal.exceptions.EntityNotFoundException;
import no.fint.portal.exceptions.UpdateEntityMismatchException;
import no.fint.portal.model.ErrorResponse;
import no.fint.portal.model.adapter.Adapter;
import no.fint.portal.model.adapter.AdapterService;
import no.fint.portal.model.component.Component;
import no.fint.portal.model.component.ComponentService;
import no.fint.portal.model.organisation.Organisation;
import no.fint.portal.model.organisation.OrganisationService;
import org.springframework.beans.factory.annotation.Autowired;
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
public class AdaperController {

  @Autowired
  private AdapterService adapterService;

  @Autowired
  private OrganisationService organisationService;

  @ApiOperation("Add adapter.")
  @RequestMapping(
    method = RequestMethod.POST,
    consumes = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity addAdapter(@RequestBody final Adapter adapter, @PathVariable("orgName") final String orgName) {

    Organisation organisation = verifyOrganisation(orgName);

    if (adapterService.addAdapter(adapter, organisation)) {
      return ResponseEntity.ok().body(adapter);
    }

    throw new EntityFoundException(
      ServletUriComponentsBuilder
        .fromCurrentRequest().path("/{name}")
        .buildAndExpand(adapter.getName()).toUri().toString()
    );
  }

  @ApiOperation("Update adapter.")
  @RequestMapping(method = RequestMethod.PUT,
    value = "/{name}"
  )
  public ResponseEntity updateAdapter(@RequestBody final Adapter adapter, @PathVariable final String adapterName,
                                      @PathVariable("orgName") final String orgName) {

    verifyOrganisation(orgName);

    if (!adapter.getName().equals(adapterName)) {
      throw new UpdateEntityMismatchException(
        String.format("Adapter requested for update (%s) is not the same adapter in endpoint (%s).",
          adapter.getName(),
          adapterName)
      );
    }
    if (!adapterService.updateAdapter(adapter)) {
      throw new EntityNotFoundException(String.format("Could not find adapter: %s", adapter));
    }

    return ResponseEntity.ok().body(adapter);

  }

  @ApiOperation("Reset adapter password.")
  @RequestMapping(method = RequestMethod.PUT,
    value = "/{adapterName}/password"
  )
  public ResponseEntity resetAdapterPassword(@PathVariable final String adapterName,
                                             @RequestHeader("x-org-id") final String orgId) {

    Organisation organisation = verifyOrganisation(orgId);

    Optional<Adapter> adapter = adapterService.getAdapter(adapterName, organisation.getName());
    if (adapter.isPresent()) {
      adapterService.resetAdapterPassword(adapter.get());
      return ResponseEntity.ok().body(adapter.get());
    }

    throw new EntityNotFoundException(String.format("Could not find adapter: %s", adapter));
  }

  @ApiOperation("Get all adapters.")
  @RequestMapping(
    method = RequestMethod.GET
  )
  public ResponseEntity getAllAdapters(@PathVariable("orgName") final String orgName) {
    Organisation organisation = verifyOrganisation(orgName);

    List<Adapter> list = adapterService.getAdapters(organisation.getName());
    return ResponseEntity.ok().body(list);
  }

  @ApiOperation("Get adapter.")
  @RequestMapping(
    method = RequestMethod.GET,
    value = "/{adapterName}"
  )
  public ResponseEntity getAdapter(@PathVariable final String adapterName, @PathVariable("orgName") final String orgName) {
    Organisation organisation = verifyOrganisation(orgName);

    Optional adapter = adapterService.getAdapter(adapterName, organisation.getName());

    if (adapter.isPresent()) {
      return ResponseEntity.ok().body(adapter.get());
    }

    throw new EntityNotFoundException(
      String.format("Adapter %s could not be found", adapterName)
    );
  }

  @ApiOperation("Delete adapter.")
  @RequestMapping(method = RequestMethod.DELETE,
    value = "/{adapterName}"
  )
  public ResponseEntity deleteAdapter(@PathVariable final String adapterName, @PathVariable("orgName") final String orgName) {

    Organisation organisation = verifyOrganisation(orgName);

    Optional<Adapter> adapter = adapterService.getAdapter(adapterName, organisation.getName());

    if (adapter.isPresent()) {
      adapterService.deleteAdapter(adapter.get());
      return ResponseEntity.accepted().build();
    }

    throw new EntityNotFoundException(
      String.format("Adapter %s could not be found.", adapter)
    );
  }


  private Organisation verifyOrganisation(String orgName) {
    return organisationService.getOrganisation(orgName).orElseThrow(() -> new EntityNotFoundException(
        String.format("Organisation %s (%s) could not be found", orgName)
      )
    );
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
