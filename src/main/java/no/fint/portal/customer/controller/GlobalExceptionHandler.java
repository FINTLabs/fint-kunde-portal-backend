package no.fint.portal.customer.controller;

import lombok.extern.slf4j.Slf4j;
import no.fint.portal.model.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex, WebRequest request, HttpServletRequest httpRequest) {

        log.error("Unhandled exception on call to: {}", httpRequest.getRequestURL());
        log.error("Unhandled exception", ex);

        ErrorResponse errorResponse = new ErrorResponse("Internal Server Error! An unexpected error occurred. Please try again later.");
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
