package no.fint.portal.customer.controller

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import no.fint.portal.customer.model.OrgName
import no.fint.portal.customer.service.ClientMetricService
import no.fint.portal.model.client.ModelVersion
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@Tag(name = "Client Metrics")
@CrossOrigin(origins = ["*"])
@RequestMapping(value = ["/client-metrics/{orgName}"])
class ClientMetricController(
    private val clientMetricService: ClientMetricService
) {

    @GetMapping("/model-versions")
    @Operation(summary = "Get client counts per model version for the organisation")
    fun getModelVersions(@PathVariable orgName: String): ResponseEntity<Map<ModelVersion, Long>> =
        ResponseEntity.ok(clientMetricService.getStats().countsFor(OrgName(orgName)))
}
