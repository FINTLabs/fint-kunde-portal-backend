package no.fint.portal;

import lombok.extern.slf4j.Slf4j;
import no.fint.portal.security.SecureUrlAccessDecisionVoter;
import no.fint.portal.security.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.vote.UnanimousBased;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.UserDetailsByNameServiceWrapper;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationProvider;
import org.springframework.security.web.authentication.preauth.RequestHeaderAuthenticationFilter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import reactor.core.publisher.Mono;

import java.util.Collections;

@Configuration
@EnableWebFluxSecurity
@Slf4j
public class ApplicationSecurity {


    @Autowired
    SecureUrlAccessDecisionVoter voter;

    @Autowired
    UserService userService;

    @Bean
    public ReactiveUserDetailsService userDetailsService() {
        return username -> Mono.justOrEmpty(userService.loadUserByUsername(username))
    }


    @Bean
    RequestHeaderAuthenticationFilter requestHeaderAuthenticationFilter() throws Exception {
        RequestHeaderAuthenticationFilter requestHeaderAuthenticationFilter = new RequestHeaderAuthenticationFilter();
        requestHeaderAuthenticationFilter.setPrincipalRequestHeader("x-nin");
        requestHeaderAuthenticationFilter.setAuthenticationManager(authenticationManager());
        return requestHeaderAuthenticationFilter;
    }

    @Bean
    PreAuthenticatedAuthenticationProvider preAuthenticatedAuthenticationProvider() {
        PreAuthenticatedAuthenticationProvider preAuthenticatedAuthenticationProvider = new PreAuthenticatedAuthenticationProvider();
        preAuthenticatedAuthenticationProvider.setPreAuthenticatedUserDetailsService(new UserDetailsByNameServiceWrapper<>(userService));
        return preAuthenticatedAuthenticationProvider;
    }

    @Bean
    public AccessDecisionManager accessDecisionManager() {
        return new UnanimousBased(Collections.singletonList(voter));
    }

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http.csrf().disable();

        http.addFilterBefore(requestHeaderAuthenticationFilter(), SecurityWebFiltersOrder.AUTHENTICATION)
                .authenticationProvider(preAuthenticatedAuthenticationProvider())
                .authorizeRequests()
                .anyRequest()
                .fullyAuthenticated()
                .accessDecisionManager(accessDecisionManager());

        return http.build();
    }
}
