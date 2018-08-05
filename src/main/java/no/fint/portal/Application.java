package no.fint.portal;

import com.github.springfox.loader.EnableSpringfox;
import no.rogfk.hateoas.extension.annotations.EnableHalHypermediaSupport;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.retry.annotation.EnableRetry;

import java.util.Properties;

@EnableHalHypermediaSupport
@EnableSpringfox
@SpringBootApplication
@EnableRetry
public class Application {
  public static void main(String[] args) {
    SpringApplication app = new SpringApplication(Application.class);

    // Modify default properties
    Properties properties = new Properties();
    properties.put("spring.mvc.throw-exception-if-no-handler-found", true);
    app.setDefaultProperties(properties);

    // Run spring application
    app.run(args);
  }

  /*
  @Bean
  public EmbeddedServletContainerCustomizer containerCustomizer() {
    return (container -> {
      ErrorPage error404Page = new ErrorPage(HttpStatus.NOT_FOUND, "/");
      container.addErrorPages(error404Page);
    });
  }
  */
}
