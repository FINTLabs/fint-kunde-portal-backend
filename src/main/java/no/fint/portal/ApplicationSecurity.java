package no.fint.portal;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.security.SecureUrlAccessDecisionVoter;
import no.fint.portal.security.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.vote.UnanimousBased;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsByNameServiceWrapper;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationProvider;
import org.springframework.security.web.authentication.preauth.RequestHeaderAuthenticationFilter;

import java.util.Collections;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class ApplicationSecurity {

    private final SecureUrlAccessDecisionVoter voter;
    private final UserService userService;

    @Bean
    public RequestHeaderAuthenticationFilter requestHeaderAuthenticationFilter(PreAuthenticatedAuthenticationProvider preAuthenticatedAuthenticationProvider) {
        RequestHeaderAuthenticationFilter requestHeaderAuthenticationFilter = new RequestHeaderAuthenticationFilter();
        requestHeaderAuthenticationFilter.setPrincipalRequestHeader("x-nin");
        requestHeaderAuthenticationFilter.setAuthenticationManager(new ProviderManager(Collections.singletonList(preAuthenticatedAuthenticationProvider)));
        return requestHeaderAuthenticationFilter;
    }

    @Bean
    public PreAuthenticatedAuthenticationProvider preAuthenticatedAuthenticationProvider() {
        PreAuthenticatedAuthenticationProvider provider = new PreAuthenticatedAuthenticationProvider();
        provider.setPreAuthenticatedUserDetailsService(new UserDetailsByNameServiceWrapper<>(userService));
        return provider;
    }

    @Bean
    public AccessDecisionManager accessDecisionManager() {
        return new UnanimousBased(Collections.singletonList(voter));
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement().disable()
                .addFilter(requestHeaderAuthenticationFilter(preAuthenticatedAuthenticationProvider()))
                .authenticationProvider(preAuthenticatedAuthenticationProvider())
                .authorizeRequests()
                .anyRequest()
                .fullyAuthenticated()
                .accessDecisionManager(accessDecisionManager());
        return http.build();
    }
}
