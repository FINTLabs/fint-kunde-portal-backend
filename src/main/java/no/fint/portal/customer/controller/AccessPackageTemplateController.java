package no.fint.portal.customer.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.customer.exception.InvalidResourceException;
import no.fint.portal.model.access.AccessPackage;
import no.fint.portal.model.access.AccessPackageTemplateService;
import org.springframework.http.ResponseEntity;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@Slf4j
@RestController
@Tag(name = "Access package template")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/accesspackage/template")
public class AccessPackageTemplateController {
    private final AccessPackageTemplateService accessPackageTemplateService;

    public AccessPackageTemplateController(AccessPackageTemplateService accessPackageTemplateService) {
        this.accessPackageTemplateService = accessPackageTemplateService;
    }

    @Operation(summary = "Get all access package template")
    @Retryable(
            backoff = @Backoff(delay = 200L),
            value = {InvalidResourceException.class},
            maxAttempts = 5
    )
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<AccessPackage>> getAccessPackageTemplates() {
        final List<AccessPackage> templates = accessPackageTemplateService.getAccessPackageTemplates();
        if (templates == null) {
            return ResponseEntity.ok(Collections.emptyList());
        }
        return ResponseEntity.ok(templates);
    }
}
