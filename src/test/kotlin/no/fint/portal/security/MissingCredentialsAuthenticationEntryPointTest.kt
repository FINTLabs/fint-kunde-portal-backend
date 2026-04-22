package no.fint.portal.security

import com.fasterxml.jackson.databind.ObjectMapper
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.mock.web.MockHttpServletRequest
import org.springframework.mock.web.MockHttpServletResponse
import org.springframework.security.authentication.InsufficientAuthenticationException

class MissingCredentialsAuthenticationEntryPointTest {

    private val entryPoint = MissingCredentialsAuthenticationEntryPoint(ObjectMapper())

    @Test
    fun `writes 400 with missing-header message when x-nin is absent`() {
        val request = MockHttpServletRequest("GET", "/organisations/foo")
        val response = MockHttpServletResponse()

        entryPoint.commence(request, response, InsufficientAuthenticationException("no auth"))

        assertThat(response.status).isEqualTo(HttpStatus.BAD_REQUEST.value())
        assertThat(response.contentType).isEqualTo(MediaType.APPLICATION_JSON_VALUE)
        assertThat(response.contentAsString)
            .contains("Missing required request header")
            .contains("x-nin")
    }

    @Test
    fun `writes 400 with invalid-header message when x-nin is present but unknown`() {
        val request = MockHttpServletRequest("GET", "/organisations/foo").apply {
            addHeader("x-nin", "99999999999")
        }
        val response = MockHttpServletResponse()

        entryPoint.commence(request, response, InsufficientAuthenticationException("unknown user"))

        assertThat(response.status).isEqualTo(HttpStatus.BAD_REQUEST.value())
        assertThat(response.contentAsString).contains("Invalid or unknown x-nin")
    }
}
