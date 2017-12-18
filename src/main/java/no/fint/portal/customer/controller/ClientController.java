package no.fint.portal.customer.controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.exceptions.EntityFoundException;
import no.fint.portal.exceptions.EntityNotFoundException;
import no.fint.portal.exceptions.UpdateEntityMismatchException;
import no.fint.portal.model.ErrorResponse;
import no.fint.portal.model.client.Client;
import no.fint.portal.model.client.ClientService;
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
@Api(tags = "Components")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/clients")
public class ClientController {

  @Autowired
  private ClientService clientService;

  @Autowired
  private OrganisationService organisationService;

  @Autowired
  private ComponentService componentService;


  @ApiOperation("Add client.")
  @RequestMapping(method = RequestMethod.POST,
    consumes = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity addClient(@RequestBody final Client client,
                                  @RequestHeader("x-org-id") final String orgId) {

    Organisation organisation = verifyOrganisation(orgId);

    if (clientService.addClient(client, organisation)) {
      return ResponseEntity.ok().body(client);
    }

    throw new EntityFoundException(
      ServletUriComponentsBuilder
        .fromCurrentRequest().path("/{uuid}")
        .buildAndExpand(client.getName()).toUri().toString()
    );
  }

  @ApiOperation("Update client.")
  @RequestMapping(method = RequestMethod.PUT,
    value = "/{clientUuid}"
  )
  public ResponseEntity updateClient(@RequestBody final Client client, @PathVariable final String clientUuid,
                                     @RequestHeader("x-org-id") final String orgId) {

    verifyOrganisation(orgId);

    if (!client.getName().equals(clientUuid)) {
      throw new UpdateEntityMismatchException(
        String.format("Client requested for update (%s) is not the same client in endpoint (%s).",
          client.getName(),
          clientUuid)
      );
    }
    if (!clientService.updateClient(client)) {
      throw new EntityNotFoundException(String.format("Could not find client: %s", client));
    }

    return ResponseEntity.ok().body(client);

  }


  @ApiOperation("Reset client password.")
  @RequestMapping(method = RequestMethod.PUT,
    value = "/{clientUuid}/password"
  )
  public ResponseEntity resetClientPassword(@PathVariable final String clientUuid,
                                            @RequestHeader("x-org-id") final String orgId) {

    Organisation organisation = verifyOrganisation(orgId);

    Optional<Client> client = clientService.getClient(clientUuid, organisation.getName());
    if (client.isPresent()) {
      clientService.resetClientPassword(client.get());
      return ResponseEntity.ok().body(client.get());
    }

    throw new EntityNotFoundException(String.format("Could not find client: %s", client));
  }

  @ApiOperation("Get all clients.")
  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity getAllClients(@RequestHeader("x-org-id") final String orgId) {
    Organisation organisation = verifyOrganisation(orgId);

    List<Client> list = clientService.getClients(organisation.getName());
    return ResponseEntity.ok().body(list);
  }

  @ApiOperation("Get client.")
  @RequestMapping(method = RequestMethod.GET,
    value = "/{clientUuid}"
  )
  public ResponseEntity getClient(@PathVariable final String clientUuid, @RequestHeader("x-org-id") final String orgId) {
    Organisation organisation = verifyOrganisation(orgId);

    Optional client = clientService.getClient(clientUuid, organisation.getName());
    if (client.isPresent()) {
      return ResponseEntity.ok().body(client.get());
    }

    throw new EntityNotFoundException(
      String.format("Client %s could not be found", clientUuid)
    );
  }

  @ApiOperation("Delete client.")
  @RequestMapping(method = RequestMethod.DELETE,
    value = "/{clientUuid}"
  )
  public ResponseEntity deleteClient(@PathVariable final String clientUuid, @RequestHeader("x-org-id") final String orgId) {

    Organisation organisation = verifyOrganisation(orgId);

    Optional<Client> client = clientService.getClient(clientUuid, organisation.getName());

    if (client.isPresent()) {
      clientService.deleteClient(client.get());
      return ResponseEntity.accepted().build();
    }

    throw new EntityNotFoundException(
      String.format("Client %s could not be found.", client)
    );
  }

  @ApiOperation("Add client to component")
  @RequestMapping(method = RequestMethod.POST,
    consumes = MediaType.APPLICATION_JSON_VALUE,
    value = "/{clientUuid}/component/{compUuid}"
  )
  public ResponseEntity addClientToComponent(@PathVariable final String clientUuid, @PathVariable final String compUuid, @RequestHeader("x-org-id") final String orgId) {

    Organisation organisation = verifyOrganisation(orgId);
    Component component = verifyComponent(compUuid);

    Optional<Client> client = clientService.getClient(clientUuid, organisation.getName());
    componentService.linkClient(component, client.get());

    return ResponseEntity.ok().build();
  }

  @ApiOperation("Remove client from component")
  @RequestMapping(method = RequestMethod.DELETE,
    value = "/{clientUuid}/component/{compUuid}/"
  )
  public ResponseEntity removeOrganisationFromComponent(@PathVariable final String clientUuid, @PathVariable final String compUuid, @RequestHeader("x-org-id") final String orgId) {

    Organisation organisation = verifyOrganisation(orgId);
    Component component = verifyComponent(compUuid);

    Optional<Client> client = clientService.getClient(clientUuid, organisation.getName());
    componentService.unLinkClient(component, client.get());

    return ResponseEntity.accepted().build();

  }


  private Organisation verifyOrganisation(String orgName) {
    Optional<Organisation> organisation = organisationService.getOrganisation(orgName);

    return organisation.orElseThrow(() -> new EntityNotFoundException(
        String.format("Organisation %s (%s) could not be found", orgName, organisation.get().getName())
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
