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
    fun `getModelVersions returns counts for the organisation`() {
        every { clientMetricService.getStats() } returns ClientModelVersionStats.from(
            mapOf(OrgName("org1") to listOf(
                clientWith(ModelVersion.V3),
                clientWith(ModelVersion.V4),
                clientWith(ModelVersion.V4)
            ))
        )

        val response = controller.getModelVersions("org1")

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(1L, response.body!![ModelVersion.V3])
        assertEquals(2L, response.body!![ModelVersion.V4])
    }

    @Test
    fun `getModelVersions serializes ModelVersion as enum name`() {
        every { clientMetricService.getStats() } returns ClientModelVersionStats.from(
            mapOf(OrgName("org1") to listOf(clientWith(ModelVersion.V3), clientWith(ModelVersion.V4)))
        )

        val response = controller.getModelVersions("org1")

        val json = objectMapper.writeValueAsString(response.body)
        assertTrue(json.contains("\"V3\""), "ModelVersion should serialize as enum name, got: $json")
        assertTrue(json.contains("\"V4\""), "ModelVersion should serialize as enum name, got: $json")
    }

    @Test
    fun `getModelVersions returns empty map for unknown org`() {
        every { clientMetricService.getStats() } returns ClientModelVersionStats.empty()

        val response = controller.getModelVersions("nonexistent")

        assertEquals(HttpStatus.OK, response.statusCode)
        assertTrue(response.body!!.isEmpty())
    }

    private fun clientWith(version: ModelVersion) = no.fint.portal.model.client.Client().apply {
        modelVersion = version
    }
}
