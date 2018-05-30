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
import no.fint.portal.model.client.Client;
import no.fint.portal.model.component.Component;
import no.fint.portal.model.component.ComponentService;
import no.fint.portal.model.organisation.Organisation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ldap.NameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.net.UnknownHostException;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@Api(tags = "Components")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/components")
public class ComponentController {

  @Autowired
  PortalApiService portalApiService;

  @Autowired
  private ComponentService componentService;

  @ApiOperation("Get all components")
  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity getComponents() {
    List<Component> components = componentService.getComponents();

    return ResponseEntity.ok(components);
  }

  @ApiOperation("Get component by name")
  @RequestMapping(method = RequestMethod.GET, value = "/{compName}")
  public ResponseEntity getComponent(@PathVariable String compName) {
    Component component = portalApiService.getComponent(compName);

    return ResponseEntity.ok(component);
  }

  @ApiOperation("Add adapter to component")
  @RequestMapping(method = RequestMethod.PUT,
    consumes = MediaType.APPLICATION_JSON_VALUE,
    value = "/{compName}/{orgName}/adapters/{adapterName}"
  )
  public ResponseEntity addAdapterToComponent(@PathVariable final String adapterName, @PathVariable final String compName, @PathVariable("orgName") final String orgName) {

    Organisation organisation = portalApiService.getOrganisation(orgName);
    Component component = portalApiService.getComponent(compName);
    Adapter adapter = portalApiService.getAdapter(organisation, adapterName);

    componentService.linkAdapter(component, adapter);

    return ResponseEntity.noContent().build();
  }

  @ApiOperation("Remove adapter from component")
  @RequestMapping(method = RequestMethod.DELETE,
    value = "/{compName}/{orgName}/adapters/{adapterName}"
  )
  public ResponseEntity removeAdapterFromComponent(@PathVariable final String adapterName, @PathVariable final String compName, @PathVariable("orgName") final String orgName) {

    Organisation organisation = portalApiService.getOrganisation(orgName);
    Component component = portalApiService.getComponent(compName);
    Adapter adapter = portalApiService.getAdapter(organisation, adapterName);

    componentService.unLinkAdapter(component, adapter);

    return ResponseEntity.noContent().build();
  }


  @ApiOperation("Add client to component")
  @RequestMapping(method = RequestMethod.PUT,
    consumes = MediaType.APPLICATION_JSON_VALUE,
    value = "/{compName}/{orgName}/clients/{clientName}"
  )
  public ResponseEntity addClientToComponent(@PathVariable final String clientName, @PathVariable final String compName, @PathVariable("orgName") final String orgName) {

    Organisation organisation = portalApiService.getOrganisation(orgName);
    Component component = portalApiService.getComponent(compName);
    Client client = portalApiService.getClient(organisation, clientName);

    componentService.linkClient(component, client);

    return ResponseEntity.noContent().build();
  }

  @ApiOperation("Remove client from component")
  @RequestMapping(method = RequestMethod.DELETE,
    value = "/{compName}/{orgName}/clients/{clientName}"
  )
  public ResponseEntity removeClientFromComponent(@PathVariable final String clientName, @PathVariable final String compName, @PathVariable("orgName") final String orgName) {

    Organisation organisation = portalApiService.getOrganisation(orgName);
    Component component = portalApiService.getComponent(compName);
    Client client = portalApiService.getClient(organisation, clientName);

    componentService.unLinkClient(component, client);

    return ResponseEntity.noContent().build();
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
