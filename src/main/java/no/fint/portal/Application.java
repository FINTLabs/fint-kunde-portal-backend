package no.fint.portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.retry.annotation.EnableRetry;

@SpringBootApplication
@EnableRetry
@EnableCaching
public class Application {
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(Application.class);

        app.run(args);
    }


    @Bean
    public CustomContainer containerCustomizer() {
        return new CustomContainer();
    }

}
