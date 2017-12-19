package no.fint.portal.customer.test;

import com.github.springfox.loader.EnableSpringfox;
import no.rogfk.hateoas.extension.annotations.EnableHalHypermediaSupport;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableHalHypermediaSupport
@EnableSpringfox
@SpringBootApplication
public class TestApplication {
  public static void main(String[] args) {
    SpringApplication app = new SpringApplication(TestApplication.class);

    // TODO: Doesn't work yet -- Spring problems.
    app.setAdditionalProfiles("test");
    // Run spring application
    app.run(args);
  }
}
