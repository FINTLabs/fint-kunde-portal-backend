package no.fint.portal.security


import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class TestAuthentication implements Authentication {

    private Collection<GrantedAuthority> authorities
    private Object principal;
    private boolean authenticated = false

    TestAuthentication(UserDetails user) {
        this.authorities = user.getAuthorities()
        this.principal = user
    }

    @Override
    Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities
    }

    @Override
    Object getCredentials() {
        return null
    }

    @Override
    Object getDetails() {
        return null
    }

    @Override
    Object getPrincipal() {
        return principal
    }

    @Override
    boolean isAuthenticated() {
        return authenticated
    }

    @Override
    void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
        authenticated = isAuthenticated
    }

    @Override
    String getName() {
        return null
    }
}
