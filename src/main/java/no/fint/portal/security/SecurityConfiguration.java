package no.fint.portal.security;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.vote.UnanimousBased;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.core.userdetails.UserDetailsByNameServiceWrapper;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationProvider;
import org.springframework.security.web.authentication.preauth.RequestHeaderAuthenticationFilter;

import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    @Value("${fint.oauth2.enabled:true}")
    private boolean oauth2Enabled;

    private final UserService userService;
    private final SecureUrlAccessDecisionVoter voter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                   PreAuthenticatedAuthenticationProvider authenticationProvider,
                                                   AccessDecisionManager accessDecisionManager,
                                                   @Qualifier("betalingRequestFilter") RequestHeaderAuthenticationFilter requestHeaderAuthenticationFilter) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(AbstractHttpConfigurer::disable)
                .addFilter(requestHeaderAuthenticationFilter)
                .authenticationProvider(authenticationProvider)
                .authorizeRequests(authorize -> {
                    authorize.anyRequest().fullyAuthenticated();
                    authorize.accessDecisionManager(accessDecisionManager);
                });

        return oauth2Enabled ? requireJwt(http) : http.build();
    }

    @Bean
    public PreAuthenticatedAuthenticationProvider preAuthenticatedAuthenticationProvider() {
        PreAuthenticatedAuthenticationProvider preAuthenticatedAuthenticationProvider = new PreAuthenticatedAuthenticationProvider();
        preAuthenticatedAuthenticationProvider.setPreAuthenticatedUserDetailsService(new UserDetailsByNameServiceWrapper<>(userService));
        return preAuthenticatedAuthenticationProvider;
    }

    @Bean
    public AccessDecisionManager accessDecisionManager() {
        return new UnanimousBased(Collections.singletonList(voter));
    }

    @Bean("betalingRequestFilter")
    public RequestHeaderAuthenticationFilter requestHeaderAuthenticationFilter(RequestHeaderAuthenticationFilter requestHeaderAuthenticationFilter) {
        requestHeaderAuthenticationFilter.setPrincipalRequestHeader("x-nin");
        return requestHeaderAuthenticationFilter;
    }

    private SecurityFilterChain requireJwt(HttpSecurity http) throws Exception {
        return http
                .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
                .build();
    }

}
