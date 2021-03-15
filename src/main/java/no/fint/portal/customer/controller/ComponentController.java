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
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ldap.NameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@Api(tags = "Components")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/components")
public class ComponentController {

    final
    PortalApiService portalApiService;

    private final ComponentService componentService;

    public ComponentController(PortalApiService portalApiService, ComponentService componentService) {
        this.portalApiService = portalApiService;
        this.componentService = componentService;
    }

    @ApiOperation("Get all components")
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Component>> getComponents() {
        List<Component> components = portalApiService.getComponents();

        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(components);
    }

    @ApiOperation("Get component by name")
    @RequestMapping(method = RequestMethod.GET, value = "/{compName}")
    public ResponseEntity<Component> getComponent(@PathVariable String compName) {
        Component component = portalApiService.getComponentByName(compName);

        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(component);
    }

    @ApiOperation(("Get components actived by an organisation"))
    @GetMapping(value = "organisation/{orgName}")
    public ResponseEntity<List<Component>> getOrganisationComponents(@PathVariable String orgName) {
        List<Component> components = new ArrayList<>();//portalApiService.getComponents();
        Organisation organisation = portalApiService.getOrganisation(orgName);

        organisation.getComponents().forEach(dn -> components.add(portalApiService.getComponentByDn(dn)));

        return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(components);
    }

    @ApiOperation("Add adapter to component")
    @RequestMapping(method = RequestMethod.PUT,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            value = "/organisation/{orgName}/{compName}/adapters/{adapterName}"
    )
    public ResponseEntity<Void> addAdapterToComponent(@PathVariable final String adapterName, @PathVariable final String compName, @PathVariable("orgName") final String orgName) {

        Organisation organisation = portalApiService.getOrganisation(orgName);
        Component component = portalApiService.getComponentByName(compName);
        Adapter adapter = portalApiService.getAdapter(organisation, adapterName);

        componentService.linkAdapter(component, adapter);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    @ApiOperation("Remove adapter from component")
    @RequestMapping(method = RequestMethod.DELETE,
            value = "/organisation/{orgName}/{compName}/adapters/{adapterName}"
    )
    public ResponseEntity<Void> removeAdapterFromComponent(@PathVariable final String adapterName, @PathVariable final String compName, @PathVariable("orgName") final String orgName) {

        Organisation organisation = portalApiService.getOrganisation(orgName);
        Component component = portalApiService.getComponentByName(compName);
        Adapter adapter = portalApiService.getAdapter(organisation, adapterName);

        componentService.unLinkAdapter(component, adapter);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }


    @ApiOperation("Add client to component")
    @RequestMapping(method = RequestMethod.PUT,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            value = "/organisation/{orgName}/{compName}/clients/{clientName}"
    )
    public ResponseEntity<Void> addClientToComponent(@PathVariable final String clientName, @PathVariable final String compName, @PathVariable("orgName") final String orgName) {

        Organisation organisation = portalApiService.getOrganisation(orgName);
        Component component = portalApiService.getComponentByName(compName);
        Client client = portalApiService.getClient(organisation, clientName);

        componentService.linkClient(component, client);

        return ResponseEntity.noContent().cacheControl(CacheControl.noStore()).build();
    }

    @ApiOperation("Remove client from component")
    @RequestMapping(method = RequestMethod.DELETE,
            value = "/organisation/{orgName}/{compName}/clients/{clientName}"
    )
    public ResponseEntity<Void> removeClientFromComponent(@PathVariable final String clientName, @PathVariable final String compName, @PathVariable("orgName") final String orgName) {

        Organisation organisation = portalApiService.getOrganisation(orgName);
        Component component = portalApiService.getComponentByName(compName);
        Client client = portalApiService.getClient(organisation, clientName);

        componentService.unLinkClient(component, client);

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
