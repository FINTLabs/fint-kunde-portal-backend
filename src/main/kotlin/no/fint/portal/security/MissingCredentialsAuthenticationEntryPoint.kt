package no.fint.portal.security

import com.fasterxml.jackson.databind.ObjectMapper
import no.fint.portal.model.ErrorResponse
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.stereotype.Component
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class MissingCredentialsAuthenticationEntryPoint(
    private val objectMapper: ObjectMapper,
) : AuthenticationEntryPoint {

    private val log = LoggerFactory.getLogger(javaClass)

    override fun commence(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authException: AuthenticationException,
    ) {
        val message = if (request.getHeader(HEADER) == null) {
            "Missing required request header: $HEADER"
        } else {
            "Invalid or unknown $HEADER"
        }

        log.debug("Rejecting {} {} — {}", request.method, request.requestURI, message)

        response.status = HttpStatus.BAD_REQUEST.value()
        response.contentType = MediaType.APPLICATION_JSON_VALUE
        objectMapper.writeValue(response.writer, ErrorResponse(message))
    }

    companion object {
        private const val HEADER = "x-nin"
    }
}
