package no.fint.portal.customer.controller;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

/**
 * Maps every request spring cannot handle to deliver index.html
 */
@SuppressWarnings("ALL")
@ControllerAdvice
class AngularController {
  @ExceptionHandler(NoHandlerFoundException.class)
  public String handle(Exception ex) {
    return "forward:/index.html";
  }
}
