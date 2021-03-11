package no.fint.portal.security

import no.fint.portal.customer.service.RoleConfig
import org.springframework.security.core.userdetails.User
import org.springframework.security.web.FilterInvocation
import spock.lang.Specification

import static org.springframework.security.access.AccessDecisionVoter.ACCESS_DENIED
import static org.springframework.security.access.AccessDecisionVoter.ACCESS_GRANTED

class AuthorizationServiceSpec extends Specification {

    AuthorizationService authorizationService
    RoleConfig roleConfig
    TestAuthentication userAuthentication
    TestAuthentication adminAuthentication
    TestAuthentication orgAuthentication
    FilterInvocation filterInvocation

    void setup() {
        filterInvocation = Mock()
        roleConfig = new RoleConfig(roles: [
                new RoleConfig.Role(id: "ROLE_ADMIN"),
                new RoleConfig.Role(id: "ROLE_ADAPTER", uri: "/api/adapters/"),
                new RoleConfig.Role(id: "ROLE_CLIENT", uri: "/api/clients/"),
        ])
        authorizationService = new AuthorizationService(roleConfig)
        adminAuthentication = new TestAuthentication(User
                .withUsername("admin@test.com")
                .password("")
                .authorities(new FintPortalAdminAuthority("ROLE_ADMIN@test_no"))
                .build())
        userAuthentication = new TestAuthentication(User
                .withUsername("user@test.com")
                .password("")
                .authorities(new FintPortalRoleAuthority("ROLE_ADAPTER@test_no"), new FintPortalRoleAuthority("ROLE_LOG@test_no"))
                .build())

        orgAuthentication = new TestAuthentication(User
                .withUsername("user@test.com")
                .password("")
                .authorities(new FintPortalOrganizationAuthority("test_no"))
                .build())

    }

    def 'Admin authentication has access to all paths, but not for another org'() {
        2 * filterInvocation.getRequestUrl() >> '/api/adapters/test_no/'
        2 * filterInvocation.getRequestUrl() >> '/api/clients/test_no'
        2 * filterInvocation.getRequestUrl() >> '/api/clients/another_org'

        expect:
        authorizationService.authorizeRequest(adminAuthentication, filterInvocation) == ACCESS_GRANTED
        authorizationService.authorizeRequest(adminAuthentication, filterInvocation) == ACCESS_GRANTED
        authorizationService.authorizeRequest(adminAuthentication, filterInvocation) == ACCESS_DENIED
    }

    def 'User authentication does not have access to client'() {
        2 * filterInvocation.getRequestUrl() >> '/api/adapters/test_no'
        2 * filterInvocation.getRequestUrl() >> '/api/clients/test_no/'

        expect:
        authorizationService.authorizeRequest(userAuthentication, filterInvocation) == ACCESS_GRANTED
        authorizationService.authorizeRequest(userAuthentication, filterInvocation) == ACCESS_DENIED

    }

    def 'Org authentication has access to all paths, but not for another org'() {
        2 * filterInvocation.getRequestUrl() >> '/api/adapters/test_no'
        2 * filterInvocation.getRequestUrl() >> '/api/clients/test_no/'
        2 * filterInvocation.getRequestUrl() >> '/api/clients/another_org'

        expect:
        authorizationService.authorizeRequest(orgAuthentication, filterInvocation) == ACCESS_GRANTED
        authorizationService.authorizeRequest(orgAuthentication, filterInvocation) == ACCESS_GRANTED
        authorizationService.authorizeRequest(orgAuthentication, filterInvocation) == ACCESS_DENIED

    }
}
