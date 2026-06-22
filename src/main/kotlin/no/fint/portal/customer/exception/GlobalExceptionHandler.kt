package no.fint.portal.customer.exception

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(FeatureDisabledException::class)
    fun featureDisabledExceptionHandling(exception: FeatureDisabledException): ResponseEntity<String> =
        ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(exception.message)

}