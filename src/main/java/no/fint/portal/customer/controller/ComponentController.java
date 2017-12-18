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
import no.fint.portal.model.client.Client;
import no.fint.portal.model.client.ClientService;
import no.fint.portal.model.component.Component;
import no.fint.portal.model.component.ComponentService;
import no.fint.portal.model.organisation.Organisation;
import no.fint.portal.model.organisation.OrganisationService;
import no.rogfk.hateoas.extension.HalPagedResources;
import no.rogfk.hateoas.extension.annotations.HalResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ldap.NameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.net.UnknownHostException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RestController
@Api(tags = "Components")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/components/{orgName}")
public class ComponentController {

  @Autowired
  private ComponentService componentService;

  @Autowired
  private OrganisationService organisationService;

  @Autowired
  private AdapterService adapterService;

  @Autowired
  private ClientService clientService;

  @ApiOperation("Get all components")
  @HalResource(pageSize = 10)
  @RequestMapping(method = RequestMethod.GET)
  public HalPagedResources<Component> getComponents(@PathVariable("orgName") final String orgName, @RequestParam(required = false) Integer page) {
    Organisation organisation = verifyOrganisation(orgName);

    List<Component> components = componentService.getComponents().stream().filter(component ->
      component.getOrganisations().contains(organisation.getDn())
    ).collect(Collectors.toList());


    return new HalPagedResources<>(components, page);
  }

  @ApiOperation("Get component by name")
  @RequestMapping(method = RequestMethod.GET, value = "/{compName}")
  public ResponseEntity getComponent(@PathVariable("orgName") final String orgName, @PathVariable String compName) {
    verifyOrganisation(orgName);

    Optional<Component> component = componentService.getComponentByName(compName);

    return ResponseEntity.ok(component.orElseThrow(() -> new EntityNotFoundException(
        String.format("Component with uuid %s could not be found", compName)
      ))
    );
  }

  @ApiOperation("Add organisation to component")
  @RequestMapping(method = RequestMethod.PUT,
    consumes = MediaType.APPLICATION_JSON_VALUE,
    value = "/{compName}"
  )
  public ResponseEntity addOrganisationToComponent(@PathVariable final String compName, @PathVariable("orgName") final String orgName) {
    Organisation organisation = verifyOrganisation(orgName);
    Component component = verifyComponent(compName);

    organisationService.linkComponent(organisation, component);
    return ResponseEntity.ok().build();
  }

  @ApiOperation("Remove organisation to component")
  @RequestMapping(method = RequestMethod.DELETE,
    value = "/{compName}"
  )
  public ResponseEntity removeOrganisationFromComponent(@PathVariable final String compName, @PathVariable("orgName") final String orgName) {

    Organisation organisation = verifyOrganisation(orgName);
    Component component = verifyComponent(compName);

    organisationService.unLinkComponent(organisation, component);

    return ResponseEntity.accepted().build();
  }

  @ApiOperation("Add adapter to component")
  @RequestMapping(method = RequestMethod.PUT,
    consumes = MediaType.APPLICATION_JSON_VALUE,
    value = "/{compName}/adapters/{adapterName}"
  )
  public ResponseEntity addAdapterToComponent(@PathVariable final String adapterName, @PathVariable final String compName, @PathVariable("orgName") final String orgName) {

    Organisation organisation = verifyOrganisation(orgName);
    Component component = verifyComponent(compName);
    Adapter adapter = verifyAdapter(organisation, adapterName);

    componentService.linkAdapter(component, adapter);

    return ResponseEntity.ok().build();
  }

  @ApiOperation("Remove adapter from component")
  @RequestMapping(method = RequestMethod.DELETE,
    value = "/{compName}/adapters/{adapterName}"
  )
  public ResponseEntity removeAdapterFromComponent(@PathVariable final String adapterName, @PathVariable final String compName, @PathVariable("orgName") final String orgName) {

    Organisation organisation = verifyOrganisation(orgName);
    Component component = verifyComponent(compName);
    Adapter adapter = verifyAdapter(organisation, adapterName);

    componentService.unLinkAdapter(component, adapter);

    return ResponseEntity.accepted().build();
  }


  @ApiOperation("Add client to component")
  @RequestMapping(method = RequestMethod.PUT,
    consumes = MediaType.APPLICATION_JSON_VALUE,
    value = "/{compName}/clients/{clientName}"
  )
  public ResponseEntity addClientToComponent(@PathVariable final String clientName, @PathVariable final String compName, @PathVariable("orgName") final String orgName) {

    Organisation organisation = verifyOrganisation(orgName);
    Component component = verifyComponent(compName);
    Client client = verifyClient(organisation, clientName);

    componentService.linkClient(component, client);

    return ResponseEntity.ok().build();
  }

  @ApiOperation("Remove client from component")
  @RequestMapping(method = RequestMethod.DELETE,
    value = "/{compName}/clients/{clientName}"
  )
  public ResponseEntity removeClientFromComponent(@PathVariable final String clientName, @PathVariable final String compName, @PathVariable("orgName") final String orgName) {

    Organisation organisation = verifyOrganisation(orgName);
    Component component = verifyComponent(compName);
    Client client = verifyClient(organisation, clientName);

    componentService.unLinkClient(component, client);

    return ResponseEntity.accepted().build();
  }


  private Organisation verifyOrganisation(String orgName) {
    Optional<Organisation> organisation = organisationService.getOrganisation(orgName);

    return organisation.orElseThrow(() -> new EntityNotFoundException(
        String.format("Organisation %s could not be found", orgName)
      )
    );
  }

  private Component verifyComponent(String compName) {
    Optional<Component> component = componentService.getComponentByName(compName);

    return component.orElseThrow(() -> new EntityNotFoundException(
        String.format("Component %s could not be found", compName)
      )
    );
  }

  private Client verifyClient(Organisation organisation, String clientName) {
    return clientService.getClient(clientName, organisation.getName()).orElseThrow(() -> new EntityNotFoundException("Client " + clientName + " not found."));
  }

  private Adapter verifyAdapter(Organisation organisation, String adapterName) {
    return adapterService.getAdapter(adapterName, organisation.getName()).orElseThrow(() -> new EntityNotFoundException("Adapter " + adapterName + " not found"));
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
