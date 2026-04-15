package no.fint.portal.customer.controller

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import io.mockk.every
import io.mockk.mockk
import no.fint.portal.customer.model.ClientModelVersionStats
import no.fint.portal.customer.model.OrgName
import no.fint.portal.customer.service.ClientMetricService
import no.fint.portal.model.client.ModelVersion
import org.junit.jupiter.api.Test
import org.springframework.http.HttpStatus
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue

class ClientMetricControllerTest {

    private val clientMetricService = mockk<ClientMetricService>()
    private val controller = ClientMetricController(clientMetricService)
    private val objectMapper = jacksonObjectMapper()

    @Test
    fun `getV4Percentage returns all orgs with correct JSON keys`() {
        every { clientMetricService.getStats() } returns ClientModelVersionStats.from(
            mapOf(
                OrgName("org1") to listOf(clientWith(ModelVersion.V3), clientWith(ModelVersion.V4)),
                OrgName("org2") to listOf(clientWith(ModelVersion.V4))
            )
        )

        val response = controller.getV4Percentage()

        assertEquals(HttpStatus.OK, response.statusCode)
        val json = objectMapper.writeValueAsString(response.body)
        assertTrue(json.contains("\"org1\""), "OrgName should serialize as plain string key, got: $json")
        assertTrue(json.contains("\"org2\""), "OrgName should serialize as plain string key, got: $json")
    }

    @Test
    fun `getV4Percentage for specific org returns value`() {
        every { clientMetricService.getStats() } returns ClientModelVersionStats.from(
            mapOf(OrgName("org1") to listOf(clientWith(ModelVersion.V3), clientWith(ModelVersion.V4)))
        )

        val response = controller.getV4Percentage("org1")

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(50.0, response.body)
    }

    @Test
    fun `getV4Percentage for unknown org returns zero`() {
        every { clientMetricService.getStats() } returns ClientModelVersionStats.empty()

        val response = controller.getV4Percentage("nonexistent")

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(0.0, response.body)
    }

    private fun clientWith(version: ModelVersion) = no.fint.portal.model.client.Client().apply {
        modelVersion = version
    }
}
