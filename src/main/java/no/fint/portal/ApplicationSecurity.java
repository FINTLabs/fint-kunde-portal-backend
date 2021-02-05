package no.fint.portal;

import lombok.extern.slf4j.Slf4j;
import no.fint.portal.security.SecureUrlAccessDecisionVoter;
import no.fint.portal.security.SecureUrlAuthorizationManager;
import no.fint.portal.security.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.ReactivePreAuthenticatedAuthenticationManager;
import org.springframework.security.web.server.context.ServerSecurityContextRepository;
import reactor.core.publisher.Mono;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableWebFluxSecurity
@Slf4j
public class ApplicationSecurity {

    @Value("${fint.portal.secure.paths:/api/adapters/,/api/assets/,/api/clients/,/api/components/organisation/,/api/organisations/}")
    private String[] securePaths;

    @Autowired
    SecureUrlAccessDecisionVoter voter;

    @Autowired
    UserService userService;

    @Autowired
    private ReactiveAuthenticationManager authenticationManager;

    @Autowired
    private ServerSecurityContextRepository securityContextRepository;

    @Autowired
    private SecureUrlAuthorizationManager authorizationManager;

    @Bean
    public ReactiveUserDetailsService userDetailsService() {
        return username -> Mono.justOrEmpty(username).map(userService::loadUserByUsername);
    }

    @Bean
    public ReactiveAuthenticationManager authenticationManager(ReactiveUserDetailsService userDetailsService) {
        return new ReactivePreAuthenticatedAuthenticationManager(userDetailsService);
    }

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        final String[] secureAntPaths = Arrays.stream(securePaths).map(p -> p + "**").toArray(String[]::new);
        // Disable default security.
        http.httpBasic().disable();
        http.formLogin().disable();
        http.csrf().disable();
        http.logout().disable();

        // Add custom security.
        http.authenticationManager(this.authenticationManager);
        http.securityContextRepository(this.securityContextRepository);

        http.authorizeExchange().pathMatchers(secureAntPaths).access(authorizationManager);
        http.authorizeExchange().anyExchange().permitAll();

        return http.build();
    }

}
