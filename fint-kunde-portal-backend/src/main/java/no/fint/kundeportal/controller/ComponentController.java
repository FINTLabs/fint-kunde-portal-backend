package no.fint.kundeportal.controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import no.fint.kundeportal.model.Component;
import no.fint.kundeportal.model.Role;
import no.fint.kundeportal.service.ComponentService;
import no.rogfk.hateoas.extension.HalPagedResources;
import no.rogfk.hateoas.extension.annotations.HalResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@Slf4j
@RestController
@Api(tags = "Components")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/components")
public class ComponentController {

    @Autowired
    ComponentService componentService;

    @ApiOperation("Request new component")
    @RequestMapping(method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity createComponent(@ModelAttribute Component component, @RequestHeader(name = "x-fint-role") Role role) {
        log.info("Component: {}", component);

        boolean compCreated = componentService.createComponent(component);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{technicalName}")
                .buildAndExpand(component.getTechnicalName()).toUri();

        if (compCreated) {
            return ResponseEntity.created(location).build();
        } else {
            return ResponseEntity.status(HttpStatus.FOUND)
                    .body(location.toString());
        }
    }


    @ApiOperation("Get all components")
    @HalResource(pageSize = 100)
    @RequestMapping(method = RequestMethod.GET)
    public HalPagedResources<Component> getComponents(@RequestParam(required = false) Integer page) {
        return new HalPagedResources<>(componentService.getComponents(), page);
    }

    @ApiOperation("Get component by technical name ")
    @RequestMapping(method = RequestMethod.GET, value = "/{technicalName}")
    public ResponseEntity getComponent(@PathVariable String technicalName) {
        Optional<Component> component = componentService.getComponent(technicalName);

        if (component.isPresent()) {
            return ResponseEntity.ok(component.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
