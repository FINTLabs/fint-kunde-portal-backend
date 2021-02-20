package no.fint;

import no.fint.portal.CustomContainer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.retry.annotation.EnableRetry;

import java.util.Properties;

@SpringBootApplication
@EnableRetry
@EnableCaching
public class Application {
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(Application.class);

        Properties properties = new Properties();
        properties.put("spring.mvc.throw-exception-if-no-handler-found", true);
        app.setDefaultProperties(properties);

        app.run(args);
    }


    @Bean
    public CustomContainer containerCustomizer() {
        return new CustomContainer();
    }

}
