package no.fint.portal.customer.controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.component.Component;
import no.fint.portal.component.ComponentService;
import no.fint.portal.customer.dto.ComponentDto;
import no.fint.portal.exceptions.EntityFoundException;
import no.fint.portal.exceptions.EntityNotFoundException;
import no.fint.portal.exceptions.UpdateEntityMismatchException;
import no.fint.portal.model.ErrorResponse;
import no.fint.portal.organisation.Organisation;
import no.fint.portal.organisation.OrganisationService;
import no.rogfk.hateoas.extension.HalPagedResources;
import no.rogfk.hateoas.extension.annotations.HalResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ldap.NameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@Api(tags = "Components")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/components")
public class ComponentController {

  @Autowired
  private ComponentService componentService;

  @Autowired
  private OrganisationService organisationService;

  @ApiOperation("Get all components")
  @HalResource(pageSize = 10)
  @RequestMapping(method = RequestMethod.GET)
  public HalPagedResources<ComponentDto> getComponents(@RequestHeader("x-org-id") final String orgId, @RequestParam(required = false) Integer page) {
    Organisation organisation = verifyOrganisation(orgId);

    List<Component> allComponents = componentService.getComponents();
    List<Component> configured = componentService.getComponentsByOrgUUID(organisation.getUuid());

    List<ComponentDto> returnedComponents = new ArrayList<>();
    allComponents.forEach((component) -> {
      ComponentDto comp = new ComponentDto(component);
      comp.setConfigured(configured.indexOf(component) > -1);
      //comp.setClients(componentService.getClients(comp.getUuid(), organisation.getUuid()));
      //List<Adapter> adapters = componentService.getAdapters(comp.getUuid(), organisation.getUuid());
      //if (adapters != null && adapters.size() > 0) {
      //  comp.setAdapter(adapters.get(0));
      //}
      returnedComponents.add(comp);
    });
    return new HalPagedResources<>(returnedComponents, page);
  }

  @ApiOperation("Get component by uuid")
  @RequestMapping(method = RequestMethod.GET, value = "/{compUuid}")
  public ResponseEntity getComponent(@RequestHeader("x-org-id") final String orgId, @PathVariable String compUuid) {
    Organisation organisation = verifyOrganisation(orgId);

    Optional<Component> component = componentService.getComponentByUUID(compUuid);

    if (component.isPresent()) {
      ComponentDto dto = new ComponentDto(component.get());
      //dto.setClients(componentService.getClients(dto.getUuid(), organisation.getUuid()));
      //List<Adapter> adapters = componentService.getAdapters(dto.getUuid(), organisation.getUuid());
      //if (adapters != null && adapters.size() > 0) {
      //  dto.setAdapter(adapters.get(0));
      //}
      return ResponseEntity.ok(dto);
    }

    throw new EntityNotFoundException(
      String.format("Component with uuid %s could not be found", compUuid)
    );
  }

  @ApiOperation("Add organisation to component")
  @RequestMapping(method = RequestMethod.POST,
    consumes = MediaType.APPLICATION_JSON_VALUE,
    value = "/{compUuid}/organisations"
  )
  public ResponseEntity addOrganisationToComponent(@PathVariable final String compUuid, @RequestHeader("x-org-id") final String orgId) {

    Organisation organisation = verifyOrganisation(orgId);
    Component component = verifyComponent(compUuid);

    //componentService.addOrganisationToComponent(compUuid, organisation.getUuid());
    organisationService.linkComponent(organisation, component);
    return ResponseEntity.ok().build();
  }

  @ApiOperation("Remove organisation to component")
  @RequestMapping(method = RequestMethod.DELETE,
    value = "/{compUuid}/organisations"
  )
  public ResponseEntity removeOrganisationFromComponent(@PathVariable final String compUuid, @RequestHeader("x-org-id") final String orgId) {

    Organisation organisation = verifyOrganisation(orgId);
    Component component = verifyComponent(compUuid);

    organisationService.unLinkComponent(organisation, component);

    return ResponseEntity.accepted().build();

  }


  private Organisation verifyOrganisation(String orgId) {
    Optional<Organisation> organisation = organisationService.getOrganisationByOrgId(orgId);
    if (organisation.isPresent()) {
      return organisation.get();
    }

    throw new EntityNotFoundException(
      String.format("Organisation %s (%s) could not be found", orgId, organisation.get().getUuid())
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
