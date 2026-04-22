package no.fint.portal.security

import no.fint.portal.ApplicationSecurity
import no.fint.portal.customer.service.RoleConfig
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.actuate.autoconfigure.endpoint.EndpointAutoConfiguration
import org.springframework.boot.actuate.autoconfigure.endpoint.web.WebEndpointAutoConfiguration
import org.springframework.boot.actuate.autoconfigure.health.HealthEndpointAutoConfiguration
import org.springframework.boot.actuate.autoconfigure.web.server.ManagementContextAutoConfiguration
import org.springframework.boot.actuate.autoconfigure.web.servlet.ServletManagementContextAutoConfiguration
import org.springframework.boot.autoconfigure.ImportAutoConfiguration
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.context.annotation.Import
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@WebMvcTest(useDefaultFilters = false)
@ImportAutoConfiguration(
    EndpointAutoConfiguration::class,
    WebEndpointAutoConfiguration::class,
    ManagementContextAutoConfiguration::class,
    ServletManagementContextAutoConfiguration::class,
    HealthEndpointAutoConfiguration::class,
)
@Import(
    ApplicationSecurity::class,
    SecureUrlAccessDecisionVoter::class,
    AuthorizationService::class,
    MissingCredentialsAuthenticationEntryPoint::class,
    RoleConfig::class,
)
@ActiveProfiles("test")
class ActuatorEndpointExposureTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @MockBean
    lateinit var userService: UserService

    @Test
    fun `health endpoint is reachable without x-nin`() {
        mockMvc.perform(get("/actuator/health"))
            .andExpect(status().isOk)
    }
}
