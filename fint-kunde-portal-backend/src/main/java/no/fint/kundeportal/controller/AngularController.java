package no.fint.kundeportal.controller;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Maps every request spring cannot handle to deliver index.html
 */
@Controller
class AngularController implements ErrorController {
    private static final String ERROR_PATH = "/error";

    @RequestMapping(value=ERROR_PATH)
    public String handleError() {
        return "forward:/index.html";
    }

    @Override
    public String getErrorPath() {
        return ERROR_PATH;
    }
}
