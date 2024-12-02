package no.fint.portal.customer.controller;

import lombok.extern.slf4j.Slf4j;
import no.fint.portal.model.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedCredentialsNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PreAuthenticatedCredentialsNotFoundException.class)
    public ResponseEntity<ErrorResponse> handlePreAuthenticatedCredentialsNotFoundException(PreAuthenticatedCredentialsNotFoundException ex, HttpServletRequest httpRequest) {
        log.error("Missing pre-authenticated credentials: {} on request to: {}", ex.getMessage(), httpRequest.getRequestURL());
        return new ResponseEntity<>(new ErrorResponse("Authentication credentials were not found."), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoHandlerFoundException(NoHandlerFoundException ex) {
        log.error("No handler found", ex);

        ErrorResponse errorResponse = new ErrorResponse("Internal Server Error! An unexpected error occurred. Please try again later. (2)");
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex, WebRequest request, HttpServletRequest httpRequest) {

        log.error("Unhandled exception on call to: {}", httpRequest.getRequestURL());
        log.error("Unhandled exception", ex);

        ErrorResponse errorResponse = new ErrorResponse("Internal Server Error! An unexpected error occurred. Please try again later.");
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
