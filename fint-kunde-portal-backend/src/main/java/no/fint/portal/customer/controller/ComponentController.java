package no.fint.portal.customer.controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.component.Adapter;
import no.fint.portal.component.Client;
import no.fint.portal.component.Component;
import no.fint.portal.component.ComponentService;
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
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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
  private ComponentService componentService;

  @Autowired
  private OrganisationService organisationService;

  @ApiOperation("Get all components")
  @HalResource(pageSize = 10)
  @RequestMapping(method = RequestMethod.GET)
  public HalPagedResources<Component> getComponents(@RequestParam(required = false) Integer page) {
    // TODO: Return DTO with boolean flag exposing if this component is configured for the organisation or not
    return new HalPagedResources<>(componentService.getComponents(), page);
  }

  @ApiOperation("Get component by uuid")
  @RequestMapping(method = RequestMethod.GET, value = "/{compUuid}")
  public ResponseEntity getComponent(@PathVariable String uuid) {
    Optional<Component> component = componentService.getComponentByUUID(uuid);

    if (component.isPresent()) {
      return ResponseEntity.ok(component.get());
    }

    throw new EntityNotFoundException(
      String.format("Component with uuid %s could not be found", uuid)
    );
  }

  @ApiOperation("Add organisation to component")
  @RequestMapping(method = RequestMethod.POST,
    consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
    value = "/{compUuid}/organisations"
  )
  public ResponseEntity addOrganisationToComponent(@PathVariable final String compUuid, @RequestHeader("x-org-id") final String orgId) {

    String orgUuid = verifyOrganisation(orgId);
    verifyComponent(compUuid);

    componentService.addOrganisationToComponent(compUuid, orgUuid);
    return ResponseEntity.ok().build();
  }

  @ApiOperation("Remove organisation to component")
  @RequestMapping(method = RequestMethod.DELETE,
    consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
    value = "/{compUuid}/organisations"
  )
  public ResponseEntity removeOrganisationFromComponent(@PathVariable final String compUuid, @RequestHeader("x-org-id") final String orgId) {

    String orgUuid = verifyOrganisation(orgId);
    verifyComponent(compUuid);

    componentService.removeOrganisationFromComponent(compUuid, orgUuid);
    return ResponseEntity.accepted().build();

  }

  @ApiOperation("Add client.")
  @RequestMapping(method = RequestMethod.POST,
    consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
    value = "/{compUuid}/organisations/clients"

  )
  public ResponseEntity addClientToOrganisationComponent(@RequestBody final Client client,
                                                         @PathVariable final String compUuid,
                                                         @RequestHeader("x-org-id") final String orgId) {

    String orgUuid = verifyOrganisation(orgId);
    verifyComponent(compUuid);

    if (componentService.addClient(client, compUuid, orgUuid)) {
      return ResponseEntity.ok().build();
    }

    throw new EntityFoundException(
      ServletUriComponentsBuilder
        .fromCurrentRequest().path("/{uuid}")
        .buildAndExpand(client.getUuid()).toUri().toString()
    );
  }

  @ApiOperation("Update client.")
  @RequestMapping(method = RequestMethod.PUT,
    value = "/{compUuid}/organisations/clients/{clientUuid}"
  )
  public ResponseEntity updateClient(@RequestBody final Client client, @PathVariable final String clientUuid,
                                     @PathVariable final String compUuid,
                                     @RequestHeader("x-org-id") final String orgId) {

    verifyOrganisation(orgId);
    verifyComponent(compUuid);

    if (!client.getUuid().equals(clientUuid)) {
      throw new UpdateEntityMismatchException(
        String.format("Client requested for update (%s) is not the same client in endpoint (%s).",
          client.getUuid(),
          clientUuid)
      );
    }
    if (!componentService.updateClient(client)) {
      throw new EntityNotFoundException(String.format("Could not find client: %s", client));
    }

    return ResponseEntity.ok().body(client);

  }

  @ApiOperation("Reset client password.")
  @RequestMapping(method = RequestMethod.PUT,
    value = "/{compUuid}/organisations/clients/{clientUuid}/password"
  )
  public ResponseEntity resetClientPassword(@PathVariable final String clientUuid,
                                            @PathVariable final String compUuid,
                                            @RequestHeader("x-org-id") final String orgId) {

    String orgUuid = verifyOrganisation(orgId);
    verifyComponent(compUuid);

    Optional<Client> client = componentService.getClient(clientUuid, compUuid, orgUuid);
    if (client.isPresent()) {
      componentService.resetClientPassword(client.get());
      return ResponseEntity.ok().body(client);
    }

    throw new EntityNotFoundException(String.format("Could not find client: %s", client));
  }

  @ApiOperation("Get all clients.")
  @RequestMapping(method = RequestMethod.GET,
    value = "/{compUuid}/organisations/clients"
  )
  public ResponseEntity getAllClients(@PathVariable final String compUuid,
                                      @RequestHeader("x-org-id") final String orgId) {
    String orgUuid = verifyOrganisation(orgId);
    verifyComponent(compUuid);

    List<Client> list = componentService.getClients(compUuid, orgUuid);
    return ResponseEntity.ok().body(list);
  }

  @ApiOperation("Get client.")
  @RequestMapping(method = RequestMethod.GET,
    value = "/{compUuid}/organisations/clients/{clientUuid}"
  )
  public ResponseEntity getClient(@PathVariable final String clientUuid, @PathVariable final String compUuid,
                                  @RequestHeader("x-org-id") final String orgId) {
    String orgUuid = verifyOrganisation(orgId);
    verifyComponent(compUuid);

    Optional client = componentService.getClient(clientUuid, compUuid, orgUuid);
    if (client.isPresent()) {
      return ResponseEntity.ok().body(client);
    }

    throw new EntityNotFoundException(
      String.format("Client %s could not be found", clientUuid)
    );
  }

  @ApiOperation("Delete client.")
  @RequestMapping(method = RequestMethod.DELETE,
    value = "/{compUuid}/organisations/clients/{clientUuid}"
  )
  public ResponseEntity deleteClient(@PathVariable final String clientUuid, @PathVariable final String compUuid,
                                     @RequestHeader("x-org-id") final String orgId) {

    String orgUuid = verifyOrganisation(orgId);
    verifyComponent(compUuid);

    Optional<Client> client = componentService.getClient(clientUuid, compUuid, orgUuid);

    if (client.isPresent()) {
      componentService.deleteClient(client.get());
      return ResponseEntity.accepted().build();
    }

    throw new EntityNotFoundException(
      String.format("Client %s could not be found.", client)
    );
  }

  @ApiOperation("Add adapter.")
  @RequestMapping(
    method = RequestMethod.POST,
    consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
    value = "/{compUuid}/organisations/adapters"

  )
  public ResponseEntity addAdapterToOrganisationComponent(@RequestBody final Adapter adapter, @PathVariable final String compUuid,
                                                          @RequestHeader("x-org-id") final String orgId) {

    String orgUuid = verifyOrganisation(orgId);
    verifyComponent(compUuid);

    if (componentService.addAdapter(adapter, compUuid, orgUuid)) {
      return ResponseEntity.ok().build();
    }

    throw new EntityFoundException(
      ServletUriComponentsBuilder
        .fromCurrentRequest().path("/{uuid}")
        .buildAndExpand(adapter.getUuid()).toUri().toString()
    );
  }

  @ApiOperation("Update adapter.")
  @RequestMapping(method = RequestMethod.PUT,
    value = "/{compUuid}/organisations/adapters/{adapterUuid}"
  )
  public ResponseEntity updateClient(@RequestBody final Adapter adapter, @PathVariable final String adapterUuid,
                                     @PathVariable final String compUuid,
                                     @RequestHeader("x-org-id") final String orgId) {

    verifyOrganisation(orgId);
    verifyComponent(compUuid);

    if (!adapter.getUuid().equals(adapterUuid)) {
      throw new UpdateEntityMismatchException(
        String.format("Adapter requested for update (%s) is not the same adapter in endpoint (%s).",
          adapter.getUuid(),
          adapterUuid)
      );
    }
    if (!componentService.updateAdapter(adapter)) {
      throw new EntityNotFoundException(String.format("Could not find adapter: %s", adapter));
    }

    return ResponseEntity.ok().body(adapter);

  }

  @ApiOperation("Reset adapter password.")
  @RequestMapping(method = RequestMethod.PUT,
    value = "/{compUuid}/organisations/adapters/{adaptertUuid}/password"
  )
  public ResponseEntity resetAdapterPassword(@PathVariable final String adapterUuid,
                                             @PathVariable final String compUuid,
                                             @RequestHeader("x-org-id") final String orgId) {

    String orgUuid = verifyOrganisation(orgId);
    verifyComponent(compUuid);

    Optional<Adapter> adapter = componentService.getAdapter(adapterUuid, compUuid, orgUuid);
    if (adapter.isPresent()) {
      componentService.resetAdapterPassword(adapter.get());
      return ResponseEntity.ok().body(adapter);
    }

    throw new EntityNotFoundException(String.format("Could not find client: %s", adapter));
  }

  @ApiOperation("Get all adapters.")
  @RequestMapping(
    method = RequestMethod.GET,
    value = "/{compUuid}/organisations/adapters"
  )
  public ResponseEntity getAllAdapters(@PathVariable final String compUuid,
                                       @RequestHeader("x-org-id") final String orgId) {
    String orgUuid = verifyOrganisation(orgId);
    verifyComponent(compUuid);

    List<Adapter> list = componentService.getAdapters(compUuid, orgUuid);
    return ResponseEntity.ok().body(list);
  }

  @ApiOperation("Get adapter.")
  @RequestMapping(
    method = RequestMethod.GET,
    value = "/{compUuid}/organisations/adapters/{adapterUuid}"
  )
  public ResponseEntity getAdapter(@PathVariable final String adapterUuid, @PathVariable final String compUuid,
                                   @RequestHeader("x-org-id") final String orgId) {
    String orgUuid = verifyOrganisation(orgId);
    verifyComponent(compUuid);

    Optional adapter = componentService.getAdapter(adapterUuid, compUuid, orgUuid);
    if (adapter.isPresent()) {
      return ResponseEntity.ok().body(adapter);
    }

    throw new EntityNotFoundException(
      String.format("Adapter %s could not be found", adapterUuid)
    );
  }

  @ApiOperation("Delete adapter.")
  @RequestMapping(method = RequestMethod.DELETE,
    value = "/{compUuid}/organisations/adapters/{adapterUuid}"
  )
  public ResponseEntity deleteAdapter(@PathVariable final String adapterUuid, @PathVariable final String compUuid,
                                      @RequestHeader("x-org-id") final String orgId) {

    String orgUuid = verifyOrganisation(orgId);
    verifyComponent(compUuid);

    Optional<Adapter> adapter = componentService.getAdapter(adapterUuid, compUuid, orgUuid);

    if (adapter.isPresent()) {
      componentService.deleteAdapter(adapter.get());
      return ResponseEntity.accepted().build();
    }

    throw new EntityNotFoundException(
      String.format("Client %s could not be found.", adapter)
    );
  }

  private String verifyOrganisation(String orgId) {
    Optional<Organisation> organisation = organisationService.getOrganisationByOrgId(orgId);
    if (organisation.isPresent()) {
      return organisation.get().getUuid();
    }

    throw new EntityNotFoundException(
      String.format("Organisation %s (%s) could not be found", orgId, organisation.get().getUuid())
    );
  }

  private void verifyComponent(String compUuid) {
    Optional<Component> component = componentService.getComponentByUUID(compUuid);
    if (!component.isPresent()) {
      throw new EntityNotFoundException(
        String.format("Component %s could not be found", compUuid)
      );
    }
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
