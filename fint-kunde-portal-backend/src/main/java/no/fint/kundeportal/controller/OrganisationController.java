package no.fint.kundeportal.controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import no.fint.kundeportal.model.Contact;
import no.fint.kundeportal.model.Organisation;
import no.fint.kundeportal.service.OrganisationService;
import no.rogfk.hateoas.extension.HalPagedResources;
import no.rogfk.hateoas.extension.annotations.HalResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@Api(tags = "Organisations")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/organisations")
public class OrganisationController {

    @Autowired
    OrganisationService organisationService;

    @ApiOperation("Request new organisation")
    @RequestMapping(method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity createOrganization(@ModelAttribute Organisation organisation) {
        log.info("Organisation: {}", organisation);

        boolean orgCreated = organisationService.createOrganization(organisation);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{orgId}")
                .buildAndExpand(organisation.getOrgId()).toUri();

        if (orgCreated) {
            return ResponseEntity.created(location).build();
        } else {
            return ResponseEntity.status(HttpStatus.FOUND)
                    .body(location.toString());
        }
    }

    @ApiOperation("Get all organisations")
    @HalResource(pageSize = 100)
    @RequestMapping(method = RequestMethod.GET)
    public HalPagedResources<Organisation> getOrganizations(@RequestParam(required = false) Integer page) {
        return new HalPagedResources<>(organisationService.getOrganizations(), page);
    }

    @ApiOperation("Get organisation by orgId")
    @RequestMapping(method = RequestMethod.GET, value = "/{orgId:.+}")
    public ResponseEntity getOrganization(@PathVariable String orgId) {
        Optional<Organisation> organisation = organisationService.getOrganization(orgId);

        if (organisation.isPresent()) {
            return ResponseEntity.ok(organisation.get());
        }
        return ResponseEntity.notFound().build();
    }

    @ApiOperation("Get the organisation contacts")
    //@HalResource(pageSize = 100)
    @RequestMapping(method = RequestMethod.GET, value = "/{id}/contacts")
    public ResponseEntity getOrganizationContacts(@PathVariable final String id) {
        Optional<List<Contact>> contacts = Optional.ofNullable(organisationService.getOrganizationContacts(id));
        if (contacts.isPresent()) {
            return ResponseEntity.ok(contacts.get());
        }
        return ResponseEntity.notFound().build();
    }
}
