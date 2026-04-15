package no.fint.portal.customer.controller

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import no.fint.portal.customer.model.OrgName
import no.fint.portal.customer.service.ClientMetricService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@Tag(name = "Client Metrics")
@CrossOrigin(origins = ["*"])
@RequestMapping(value = ["/client-metrics"])
class ClientMetricController(
    private val clientMetricService: ClientMetricService
) {

    @GetMapping("/v4-percentage")
    @Operation(summary = "Get V4 client percentage for all organisations")
    fun getV4Percentage(): ResponseEntity<Map<OrgName, Double>> =
        ResponseEntity.ok(clientMetricService.getStats().getV4Percentage())

    @GetMapping("/v4-percentage/{orgName}")
    @Operation(summary = "Get V4 client percentage for a specific organisation")
    fun getV4Percentage(@PathVariable orgName: String): ResponseEntity<Double> =
        ResponseEntity.ok(clientMetricService.getStats().getV4Percentage(OrgName(orgName)))
}
