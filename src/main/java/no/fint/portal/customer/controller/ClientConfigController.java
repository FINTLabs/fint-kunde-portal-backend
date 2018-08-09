package no.fint.portal.customer.controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.customer.config.ClientConfig;
import no.fint.portal.customer.service.ClientConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@Api(tags = "Client config")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/config/client")
public class ClientConfigController {


  @Autowired
  private ClientConfig clientConfig;

  @ApiOperation("Get client config")
  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity getClientConfig() {
    return ResponseEntity.ok(clientConfig);
  }
}
