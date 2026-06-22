package no.fint.portal.customer.controller

import io.mockk.every
import io.mockk.mockk
import no.fint.portal.customer.config.Feature
import no.fint.portal.customer.config.FeatureProperties
import no.fint.portal.customer.exception.FeatureDisabledException
import no.fint.portal.customer.service.PortalApiService
import no.fint.portal.model.client.Client
import no.fint.portal.model.client.ClientService
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertDoesNotThrow
import org.junit.jupiter.api.assertThrows
import org.springframework.http.HttpStatus

class ClientControllerTest {

    private val portalApiService = mockk<PortalApiService>(relaxed = true)
    private val clientService = mockk<ClientService>(relaxed = true)
    private val featureProperties = mockk<FeatureProperties>()

    private val clientController = ClientController(portalApiService, clientService, featureProperties)

    @Test
    fun `addClient returns 201 Created when credentials feature is enabled`() {
        every { featureProperties.isEnabled(Feature.OAUTH_CREDENTIALS_CREATE) } returns true
        val response = assertDoesNotThrow { clientController.addClient("orgName", mockk<Client>(relaxed = true)) }
        assertEquals(HttpStatus.CREATED, response.statusCode)
    }

    @Test
    fun `addClient throws FeatureDisabledException when credentials feature is disabled`() {
        every { featureProperties.isEnabled(Feature.OAUTH_CREDENTIALS_CREATE) } returns false
        assertThrows<FeatureDisabledException> {
            clientController.addClient("orgName", mockk<Client>(relaxed = true))
        }
    }

    @Test
    fun `deleteClient returns 204 No-Content when credentials feature is enabled`() {
        every { featureProperties.isEnabled(Feature.OAUTH_CREDENTIALS_DELETE) } returns true

        val response = assertDoesNotThrow { clientController.deleteClient("orgName", "clientName") }

        assertEquals(HttpStatus.NO_CONTENT, response.statusCode)
    }

    @Test
    fun `deleteClient throws FeatureDisabledException when credentials feature is disabled`() {
        every { featureProperties.isEnabled(Feature.OAUTH_CREDENTIALS_DELETE) } returns false
        assertThrows<FeatureDisabledException> {
            clientController.deleteClient("orgName", "clientName")
        }
    }

}
