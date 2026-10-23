package no.fint.portal.customer.controller

import no.fint.portal.customer.config.FeatureProperties
import no.fint.portal.customer.service.PortalApiService
import no.fint.portal.model.adapter.AdapterService
import no.fint.portal.model.client.ClientService
import no.fint.portal.model.organisation.Organisation
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.ArgumentMatchers.any
import org.mockito.Mockito.`when`
import org.mockito.Mockito.verifyNoInteractions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.security.oauth2.resource.servlet.OAuth2ResourceServerAutoConfiguration
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.context.TestPropertySource
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@WebMvcTest(
    controllers = [AdapterController::class, ClientController::class],
    excludeAutoConfiguration = [OAuth2ResourceServerAutoConfiguration::class]
)
@AutoConfigureMockMvc(addFilters = false)
@EnableConfigurationProperties(FeatureProperties::class)
@TestPropertySource(properties = ["feature.flags.oauth-credentials-create=true"])
class CredentialNameLengthTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @MockBean
    lateinit var portalApiService: PortalApiService

    @MockBean
    lateinit var adapterService: AdapterService

    @MockBean
    lateinit var clientService: ClientService

    @BeforeEach
    fun setUp() {
        `when`(portalApiService.getOrganisation("orgName"))
            .thenReturn(Organisation().apply { primaryAssetId = "fintlabs.no" })
    }

    @Test
    fun `POST client returns 400 when the CN would exceed 64 characters`() {
        mockMvc.perform(
            post("/clients/{orgName}", "orgName")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""{"name":"${"a".repeat(46)}"}""")
        )
            .andExpect(status().isBadRequest)
            .andExpect(jsonPath("$.message").value("Name can be at most 45 characters for this organisation."))

        verifyNoInteractions(clientService)
    }

    @Test
    fun `POST client returns 201 when the CN is exactly 64 characters`() {
        mockMvc.perform(
            post("/clients/{orgName}", "orgName")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""{"name":"${"a".repeat(45)}"}""")
        ).andExpect(status().isCreated)
    }

    @Test
    fun `POST adapter returns 400 when the CN would exceed 64 characters`() {
        mockMvc.perform(
            post("/adapters/{orgName}", "orgName")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""{"name":"${"a".repeat(45)}"}""")
        )
            .andExpect(status().isBadRequest)
            .andExpect(jsonPath("$.message").value("Name can be at most 44 characters for this organisation."))

        verifyNoInteractions(adapterService)
    }

    @Test
    fun `POST adapter returns 201 when the CN is exactly 64 characters`() {
        `when`(adapterService.addAdapter(any(), any())).thenReturn(true)

        mockMvc.perform(
            post("/adapters/{orgName}", "orgName")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""{"name":"${"a".repeat(44)}"}""")
        ).andExpect(status().isCreated)
    }
}
