package no.fint.portal.security;

import org.springframework.http.HttpMessage;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.security.web.server.context.ServerSecurityContextRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Repository
public class PreAuthenticatedSecurityContextRepository implements ServerSecurityContextRepository {
    @Override
    public Mono<Void> save(ServerWebExchange exchange, SecurityContext context) {
        return null;
    }

    @Override
    public Mono<SecurityContext> load(ServerWebExchange exchange) {
        return Mono
                .just(exchange)
                .map(ServerWebExchange::getRequest)
                .map(HttpMessage::getHeaders)
                .flatMapIterable(h -> h.getOrEmpty("x-nin"))
                .map(nin -> new PreAuthenticatedAuthenticationToken(nin, "N/A"))
                .map(SecurityContextImpl::new)
                .cast(SecurityContext.class)
                .next();
    }
}
