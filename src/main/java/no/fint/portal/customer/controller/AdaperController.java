package no.fint.portal.customer.controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.adapter.Adapter;
import no.fint.portal.adapter.AdapterService;
import no.fint.portal.client.Client;
import no.fint.portal.component.Component;
import no.fint.portal.component.ComponentService;
import no.fint.portal.exceptions.EntityFoundException;
import no.fint.portal.exceptions.EntityNotFoundException;
import no.fint.portal.exceptions.UpdateEntityMismatchException;
import no.fint.portal.model.ErrorResponse;
import no.fint.portal.organisation.Organisation;
import no.fint.portal.organisation.OrganisationService;
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
@Api(tags = "Components")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/adapters")
public class AdaperController {

  @Autowired
  private AdapterService adapterService;

  @Autowired
  private OrganisationService organisationService;

  @Autowired
  private ComponentService componentService;

  @ApiOperation("Add adapter.")
  @RequestMapping(
    method = RequestMethod.POST,
    consumes = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity addAdapter(@RequestBody final Adapter adapter, @RequestHeader("x-org-id") final String orgId) {

    Organisation organisation = verifyOrganisation(orgId);

    if (adapterService.addAdapter(adapter, organisation)) {
      return ResponseEntity.ok().body(adapter);
    }

    throw new EntityFoundException(
      ServletUriComponentsBuilder
        .fromCurrentRequest().path("/{uuid}")
        .buildAndExpand(adapter.getName()).toUri().toString()
    );
  }

  @ApiOperation("Update adapter.")
  @RequestMapping(method = RequestMethod.PUT,
    value = "/{adapterUuid}"
  )
  public ResponseEntity updateAdapter(@RequestBody final Adapter adapter, @PathVariable final String adapterUuid,
                                      @RequestHeader("x-org-id") final String orgId) {

    verifyOrganisation(orgId);

    if (!adapter.getName().equals(adapterUuid)) {
      throw new UpdateEntityMismatchException(
        String.format("Adapter requested for update (%s) is not the same adapter in endpoint (%s).",
          adapter.getName(),
          adapterUuid)
      );
    }
    if (!adapterService.updateAdapter(adapter)) {
      throw new EntityNotFoundException(String.format("Could not find adapter: %s", adapter));
    }

    return ResponseEntity.ok().body(adapter);

  }

  @ApiOperation("Reset adapter password.")
  @RequestMapping(method = RequestMethod.PUT,
    value = "/{adapterUuid}/password"
  )
  public ResponseEntity resetAdapterPassword(@PathVariable final String adapterUuid,
                                             @RequestHeader("x-org-id") final String orgId) {

    Organisation organisation = verifyOrganisation(orgId);

    Optional<Adapter> adapter = adapterService.getAdapter(adapterUuid, organisation.getName());
    if (adapter.isPresent()) {
      adapterService.resetAdapterPassword(adapter.get());
      return ResponseEntity.ok().body(adapter.get());
    }

    throw new EntityNotFoundException(String.format("Could not find client: %s", adapter));
  }

  @ApiOperation("Get all adapters.")
  @RequestMapping(
    method = RequestMethod.GET
  )
  public ResponseEntity getAllAdapters(@RequestHeader("x-org-id") final String orgId) {
    Organisation organisation = verifyOrganisation(orgId);

    List<Adapter> list = adapterService.getAdapters(organisation.getName());
    return ResponseEntity.ok().body(list);
  }

  @ApiOperation("Get adapter.")
  @RequestMapping(
    method = RequestMethod.GET,
    value = "/{adapterUuid}"
  )
  public ResponseEntity getAdapter(@PathVariable final String adapterUuid, @RequestHeader("x-org-id") final String orgId) {
    Organisation organisation = verifyOrganisation(orgId);

    Optional adapter = adapterService.getAdapter(adapterUuid, organisation.getName());
    if (adapter.isPresent()) {
      return ResponseEntity.ok().body(adapter.get());
    }

    throw new EntityNotFoundException(
      String.format("Adapter %s could not be found", adapterUuid)
    );
  }

  @ApiOperation("Delete adapter.")
  @RequestMapping(method = RequestMethod.DELETE,
    value = "/{adapterUuid}"
  )
  public ResponseEntity deleteAdapter(@PathVariable final String adapterUuid, @RequestHeader("x-org-id") final String orgId) {

    Organisation organisation = verifyOrganisation(orgId);

    Optional<Adapter> adapter = adapterService.getAdapter(adapterUuid, organisation.getName());

    if (adapter.isPresent()) {
      adapterService.deleteAdapter(adapter.get());
      return ResponseEntity.accepted().build();
    }

    throw new EntityNotFoundException(
      String.format("Adapter %s could not be found.", adapter)
    );
  }

  @ApiOperation("Add adapter to component")
  @RequestMapping(method = RequestMethod.POST,
    consumes = MediaType.APPLICATION_JSON_VALUE,
    value = "/{adapterUuid}/component/{compUuid}"
  )
  public ResponseEntity addClientToComponent(@PathVariable final String adapterUuid, @PathVariable final String compUuid, @RequestHeader("x-org-id") final String orgId) {

    Organisation organisation = verifyOrganisation(orgId);
    Component component = verifyComponent(compUuid);

    Optional<Adapter> adapter = adapterService.getAdapter(adapterUuid, organisation.getName());
    adapterService.linkComponent(adapter.get(), component);

    return ResponseEntity.ok().build();
  }

  @ApiOperation("Remove adapter from component")
  @RequestMapping(method = RequestMethod.DELETE,
    value = "/{adapterUuid}/component/{compUuid}"
  )
  public ResponseEntity removeOrganisationFromComponent(@PathVariable final String adapterUuid, @PathVariable final String compUuid, @RequestHeader("x-org-id") final String orgId) {

    Organisation organisation = verifyOrganisation(orgId);
    Component component = verifyComponent(compUuid);

    Optional<Adapter> adapter = adapterService.getAdapter(adapterUuid, organisation.getName());
    adapterService.unLinkComponent(adapter.get(), component);

    return ResponseEntity.accepted().build();

  }


  private Organisation verifyOrganisation(String orgId) {
    Optional<Organisation> organisation = organisationService.getOrganisationByOrgId(orgId);
    if (organisation.isPresent()) {
      return organisation.get();
    }

    throw new EntityNotFoundException(
      String.format("Organisation %s (%s) could not be found", orgId)
    );
  }

  private Component verifyComponent(String compUuid) {
    Optional<Component> component = componentService.getComponentByUUID(compUuid);
    if (component.isPresent()) {
      return component.get();
    }
    throw new EntityNotFoundException(
      String.format("Component %s could not be found", compUuid)
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
