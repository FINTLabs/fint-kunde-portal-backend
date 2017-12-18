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
@Api(tags = "Clients")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/clients/{orgName}")
public class ClientController {

  @Autowired
  private ClientService clientService;

  @Autowired
  private OrganisationService organisationService;

  @ApiOperation("Add client.")
  @RequestMapping(method = RequestMethod.POST,
    consumes = MediaType.APPLICATION_JSON_VALUE
  )
  public ResponseEntity addClient(@RequestBody final Client client,
                                  @PathVariable("orgName") final String orgName) {

    Organisation organisation = verifyOrganisation(orgName);

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
    value = "/{clientName}"
  )
  public ResponseEntity updateClient(@RequestBody final Client client, @PathVariable final String clientName,
                                     @PathVariable("orgName") final String orgName) {

    verifyOrganisation(orgName);

    if (!client.getName().equals(clientName)) {
      throw new UpdateEntityMismatchException(
        String.format("Client requested for update (%s) is not the same client in endpoint (%s).",
          client.getName(),
          clientName)
      );
    }
    if (!clientService.updateClient(client)) {
      throw new EntityNotFoundException(String.format("Could not find client: %s", client));
    }

    return ResponseEntity.ok().body(client);

  }


  @ApiOperation("Reset client password.")
  @RequestMapping(method = RequestMethod.PUT,
    value = "/{clientName}/password"
  )
  public ResponseEntity resetClientPassword(@PathVariable final String clientName,
                                            @PathVariable("orgName") final String orgName) {

    Organisation organisation = verifyOrganisation(orgName);

    Optional<Client> client = clientService.getClient(clientName, organisation.getName());
    if (client.isPresent()) {
      clientService.resetClientPassword(client.get());
      return ResponseEntity.ok().body(client.get());
    }

    throw new EntityNotFoundException(String.format("Could not find client: %s", client));
  }

  @ApiOperation("Get all clients.")
  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity getAllClients(@PathVariable("orgName") final String orgName) {
    Organisation organisation = verifyOrganisation(orgName);

    List<Client> list = clientService.getClients(organisation.getName());
    return ResponseEntity.ok().body(list);
  }

  @ApiOperation("Get client.")
  @RequestMapping(method = RequestMethod.GET,
    value = "/{clientName}"
  )
  public ResponseEntity getClient(@PathVariable final String clientName, @PathVariable("orgName") final String orgName) {
    Organisation organisation = verifyOrganisation(orgName);

    Optional client = clientService.getClient(clientName, organisation.getName());
    if (client.isPresent()) {
      return ResponseEntity.ok().body(client.get());
    }

    throw new EntityNotFoundException(
      String.format("Client %s could not be found", clientName)
    );
  }

  @ApiOperation("Delete client.")
  @RequestMapping(method = RequestMethod.DELETE,
    value = "/{clientName}"
  )
  public ResponseEntity deleteClient(@PathVariable final String clientName, @PathVariable("orgName") final String orgName) {

    Organisation organisation = verifyOrganisation(orgName);

    Optional<Client> client = clientService.getClient(clientName, organisation.getName());

    if (client.isPresent()) {
      clientService.deleteClient(client.get());
      return ResponseEntity.accepted().build();
    }

    throw new EntityNotFoundException(
      String.format("Client %s could not be found.", client)
    );
  }


  private Organisation verifyOrganisation(String orgName) {
    Optional<Organisation> organisation = organisationService.getOrganisation(orgName);

    return organisation.orElseThrow(() -> new EntityNotFoundException(
        String.format("Organisation %s (%s) could not be found", orgName, organisation.get().getName())
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
