package no.fint.portal.customer.controller

import no.fint.portal.customer.config.FeatureProperties
import no.fint.portal.customer.service.PortalApiService
import no.fint.portal.model.adapter.AdapterService
import no.fint.portal.model.client.ClientService
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.security.oauth2.resource.servlet.OAuth2ResourceServerAutoConfiguration
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.context.TestPropertySource
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@WebMvcTest(
    controllers = [AdapterController::class, ClientController::class],
    excludeAutoConfiguration = [OAuth2ResourceServerAutoConfiguration::class]
)
@AutoConfigureMockMvc(addFilters = false)
@EnableConfigurationProperties(FeatureProperties::class)
@TestPropertySource(
    properties = [
        "feature.flags.oauth-credentials-create=false",
        "feature.flags.oauth-credentials-delete=false",
    ]
)
class OAuthCredentialsFeatureFlagTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @MockBean
    lateinit var portalApiService: PortalApiService

    @MockBean
    lateinit var adapterService: AdapterService

    @MockBean
    lateinit var clientService: ClientService

    @Test
    fun `POST adapter returns 503 when create feature is disabled`() {
        mockMvc.perform(
            post("/adapters/{orgName}", "orgName")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""{"name":"test"}""")
        ).andExpect(status().isServiceUnavailable)
    }

    @Test
    fun `DELETE adapter returns 503 when delete feature is disabled`() {
        mockMvc.perform(delete("/adapters/{orgName}/{adapterName}", "orgName", "adapterName"))
            .andExpect(status().isServiceUnavailable)
    }

    @Test
    fun `POST client returns 503 when create feature is disabled`() {
        mockMvc.perform(
            post("/clients/{orgName}", "orgName")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""{"name":"test"}""")
        ).andExpect(status().isServiceUnavailable)
    }

    @Test
    fun `DELETE client returns 503 when delete feature is disabled`() {
        mockMvc.perform(delete("/clients/{orgName}/{clientName}", "orgName", "clientName"))
            .andExpect(status().isServiceUnavailable)
    }
}
