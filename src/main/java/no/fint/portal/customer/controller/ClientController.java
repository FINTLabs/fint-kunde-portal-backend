package no.fint.portal.customer.controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.customer.service.PortalApiService;
import no.fint.portal.exceptions.EntityFoundException;
import no.fint.portal.exceptions.EntityNotFoundException;
import no.fint.portal.exceptions.UpdateEntityMismatchException;
import no.fint.portal.model.ErrorResponse;
import no.fint.portal.model.client.Client;
import no.fint.portal.model.client.ClientService;
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
@Api(tags = "Clients")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/clients/{orgName}")
public class ClientController {

    @Autowired
    PortalApiService portalApiService;

    @Autowired
    private ClientService clientService;


    @ApiOperation("Add client")
    @RequestMapping(method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Client> addClient(@PathVariable("orgName") final String orgName,
                                            @RequestBody final Client client) {

        Organisation organisation = portalApiService.getOrganisation(orgName);
        Optional<Client> optionalClient = clientService.getClient(client.getName(), orgName);


        if (optionalClient.isEmpty()) {
            if (clientService.addClient(client, organisation)) {
                return ResponseEntity.status(HttpStatus.CREATED).cacheControl(CacheControl.noStore()).body(client);

            }
        }

        throw new EntityFoundException(
                ServletUriComponentsBuilder
                        .fromCurrentRequest().path("/{name}")
                        .buildAndExpand(client.getName()).toUri().toString()
        );
    }

    @ApiOperation("Update client")
    @RequestMapping(method = RequestMethod.PUT,
            value = "/{clientName}"
    )
    public ResponseEntity<Client> updateClient(@PathVariable("orgName") final String orgName,
                                               @PathVariable final String clientName,
                                               @RequestBody final Client client) {

        Organisation organisation = portalApiService.getOrganisation(orgName);
        Client original = portalApiService.getClient(organisation, clientName);

        if (!clientName.equals(client.getName())) {
            throw new UpdateEntityMismatchException(
                    String.format("Client requested for update (%s) is not the same client in endpoint (%s).",
                            client.getName(),
                            clientName)
            );
        }

        if (client.getNote() != null)
            original.setNote(client.getNote());
        if (client.getShortDescription() != null)
            original.setShortDescription(client.getShortDescription());

        if (!clientService.updateClient(original)) {
            throw new EntityNotFoundException(String.format("Could not update client: %s", clientName));
        }

        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(original);
    }


    @ApiOperation("Reset client password")
    @RequestMapping(method = RequestMethod.PUT,
            value = "/{clientName}/password"
    )
    public ResponseEntity<Client> resetClientPassword(@PathVariable("orgName") final String orgName,
                                                      @PathVariable final String clientName,
                                                      @RequestBody String newPassword) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Client client = portalApiService.getClient(organisation, clientName);

        clientService.resetClientPassword(client, newPassword);
        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(client);
    }

    @ApiOperation("Get all clients")
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Client>> getAllClients(@PathVariable("orgName") final String orgName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);

        List<Client> list = portalApiService.getClients(organisation);
        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(list);
    }

    @ApiOperation("Get client")
    @RequestMapping(method = RequestMethod.GET,
            value = "/{clientName}"
    )
    public ResponseEntity<Client> getClient(@PathVariable("orgName") final String orgName,
                                            @PathVariable final String clientName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Client client = portalApiService.getClient(organisation, clientName);

        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(client);
    }

    @ApiOperation("Get Client OpenID Secret")
    @RequestMapping(
            method = RequestMethod.GET,
            value = "/{clientName}/secret"
    )
    public ResponseEntity<String> getClientSecret(@PathVariable("orgName") final String orgName,
                                                  @PathVariable final String clientName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Client client = portalApiService.getClient(organisation, clientName);

        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(clientService.getClientSecret(client));
    }


    @ApiOperation("Delete client")
    @RequestMapping(method = RequestMethod.DELETE,
            value = "/{clientName}"
    )
    public ResponseEntity<Void> deleteClient(@PathVariable("orgName") final String orgName,
                                             @PathVariable final String clientName) {
        Organisation organisation = portalApiService.getOrganisation(orgName);
        Client client = portalApiService.getClient(organisation, clientName);

        clientService.deleteClient(client);
        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }


    //
    // Exception handlers
    //
    @ExceptionHandler(UpdateEntityMismatchException.class)
    public ResponseEntity<ErrorResponse> handleUpdateEntityMismatch(Exception e) {
        return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFound(Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(EntityFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityFound(Exception e) {
        return ResponseEntity.status(HttpStatus.FOUND).body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(NameNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNameNotFound(Exception e) {
        return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(UnknownHostException.class)
    public ResponseEntity<ErrorResponse> handleUnkownHost(Exception e) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(new ErrorResponse(e.getMessage()));
    }


}
