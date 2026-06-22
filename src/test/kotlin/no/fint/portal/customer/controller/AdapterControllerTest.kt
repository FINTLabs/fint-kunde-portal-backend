package no.fint.portal.customer.controller

import io.mockk.every
import io.mockk.mockk
import no.fint.portal.customer.config.Feature
import no.fint.portal.customer.config.FeatureProperties
import no.fint.portal.customer.exception.FeatureDisabledException
import no.fint.portal.customer.service.PortalApiService
import no.fint.portal.model.adapter.Adapter
import no.fint.portal.model.adapter.AdapterService
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertDoesNotThrow
import org.junit.jupiter.api.assertThrows
import org.springframework.http.HttpStatus
import java.util.Optional

class AdapterControllerTest {

    private val portalApiService = mockk<PortalApiService>(relaxed = true)
    private val adapterService = mockk<AdapterService>(relaxed = true)
    private val featureProperties = mockk<FeatureProperties>()

    private val adapterController = AdapterController(portalApiService, adapterService, featureProperties)

    @Test
    fun `addAdapter returns 201 Created when credentials feature is enabled`() {
        val adapter = mockk<Adapter>(relaxed = true)
        every { featureProperties.isEnabled(Feature.OAUTH_CREDENTIALS_CREATE) } returns true
        every { adapterService.getAdapter(any(), any()) } returns Optional.empty()
        every { adapterService.addAdapter(adapter, any()) } returns true

        val response = assertDoesNotThrow { adapterController.addAdapter("orgName", adapter) }

        assertEquals(HttpStatus.CREATED, response.statusCode)
    }

    @Test
    fun `addAdapter throws FeatureDisabledException when credentials feature is disabled`() {
        every { featureProperties.isEnabled(Feature.OAUTH_CREDENTIALS_CREATE) } returns false
        assertThrows<FeatureDisabledException> {
            adapterController.addAdapter("orgName", mockk<Adapter>(relaxed = true))
        }
    }

    @Test
    fun `deleteAdapter returns 204 No-Content when credentials feature is enabled`() {
        every { featureProperties.isEnabled(Feature.OAUTH_CREDENTIALS_DELETE) } returns true
        val response = assertDoesNotThrow { adapterController.deleteAdapter("orgName", "adapterName") }
        assertEquals(HttpStatus.NO_CONTENT, response.statusCode)
    }

    @Test
    fun `deleteAdapter throws FeatureDisabledException when credentials feature is disabled`() {
        every { featureProperties.isEnabled(Feature.OAUTH_CREDENTIALS_DELETE) } returns false
        assertThrows<FeatureDisabledException> { adapterController.deleteAdapter("orgName", "adapterName") }
    }

}
