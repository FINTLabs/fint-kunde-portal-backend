package no.fint.portal.customer.test;

import com.github.springfox.loader.EnableSpringfox;
import no.rogfk.hateoas.extension.annotations.EnableHalHypermediaSupport;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.test.context.ActiveProfiles;

@EnableHalHypermediaSupport
@EnableSpringfox
@SpringBootApplication
@ActiveProfiles("test")
public class TestApplication {
  public static void main(String[] args) {
    SpringApplication app = new SpringApplication(no.fint.portal.Application.class);

    // Run spring application
    app.run(args);
  }
}
