package no.fint.portal.security

import no.fint.portal.customer.service.RoleConfig
import org.springframework.http.HttpMethod
import org.springframework.security.core.userdetails.User
import org.springframework.security.web.FilterInvocation
import spock.lang.Specification


import static org.springframework.security.access.AccessDecisionVoter.ACCESS_DENIED;
import static org.springframework.security.access.AccessDecisionVoter.ACCESS_GRANTED;

class AuthorizationServiceSpec extends Specification {

    AuthorizationService authorizationService
    RoleConfig roleConfig
    TestAuthentication userAuthentication
    TestAuthentication adminAuthentication

    void setup() {
        roleConfig = new RoleConfig(roles: [
                new RoleConfig.Role(id: "ROLE_ADMIN"),
                new RoleConfig.Role(id: "ROLE_ADAPTER", uri: "/api/adapters/"),
                new RoleConfig.Role(id: "ROLE_CLIENT", uri: "/api/clients/"),
        ])
        authorizationService = new AuthorizationService(roleConfig)
        adminAuthentication = new TestAuthentication(User
                .withUsername("admin@test.com")
                .password("")
                .authorities("ROLE_ADMIN", "test_no")
                .build())
        userAuthentication = new TestAuthentication(User
                .withUsername("user@test.com")
                .password("")
                .authorities("ROLE_ADAPTER", "ROLE_LOG", "test_no")
                .build())

    }

    def "Admin user is admin"() {
        when:
        def isAdmin = authorizationService.isAdmin(adminAuthentication)

        then:
        isAdmin
    }

    def "Standard user is not admin"() {
        when:
        def isAdmin = authorizationService.isAdmin(userAuthentication)

        then:
        !isAdmin
    }

    def "User has ROLE_LOG"() {
        when:
        def hasRole = authorizationService.hasRole(userAuthentication, new RoleConfig.Role(id: "ROLE_LOG"))

        then:
        hasRole
    }

    def "User don't have ROLE_CLIENT"() {
        when:
        def hasRole = authorizationService.hasRole(userAuthentication, new RoleConfig.Role(id: "ROLE_CLIENT"))

        then:
        !hasRole
    }

    def "Admin user is authorized"() {
        when:
        def isAuthorizedByRole = authorizationService.isAuthorizedByRole(
                adminAuthentication,
                new FilterInvocation("/api/adapters", HttpMethod.GET.name())
        )

        then:
        isAuthorizedByRole
    }

    def "User is authorized to /api/apapters"() {
        when:
        def isAuthorizedByRole = authorizationService.isAuthorizedByRole(
                userAuthentication,
                new FilterInvocation("/api/adapters/test_no", HttpMethod.GET.name())
        )

        then:
        isAuthorizedByRole
    }

    def "User is not authorized to /api/clients"() {
        when:
        def isAuthorizedByRole = authorizationService.isAuthorizedByRole(
                userAuthentication,
                new FilterInvocation("/api/clients/test_no", HttpMethod.GET.name())
        )

        then:
        !isAuthorizedByRole
    }

    def "User is authorized for test_no organisation"() {
        when:
        def isAuthorizedToOrganisation = authorizationService.isAuthorizedToOrganisation(
                userAuthentication,
                new FilterInvocation("/api/clients/test_no", HttpMethod.GET.name()),
                authorizationService.getSecurePaths()
        )

        then:
        isAuthorizedToOrganisation == ACCESS_GRANTED
    }

    def "User is not authorized for fintlabs_no organisation"() {
        when:
        def isAuthorizedToOrganisation = authorizationService.isAuthorizedToOrganisation(
                userAuthentication,
                new FilterInvocation("/api/clients/fintlabs_no", HttpMethod.GET.name()),
                authorizationService.getSecurePaths()
        )

        then:
        isAuthorizedToOrganisation == ACCESS_DENIED
    }

    def "Admin user is authorized for test_no organisation"() {
        when:
        def isAuthorizedToOrganisation = authorizationService.isAuthorizedToOrganisation(
                adminAuthentication,
                new FilterInvocation("/api/clients/test_no", HttpMethod.GET.name()),
                authorizationService.getSecurePaths()
        )

        then:
        isAuthorizedToOrganisation == ACCESS_GRANTED
    }

    def "Admin user is not authorized for fintlabs_no organisation"() {
        when:
        def isAuthorizedToOrganisation = authorizationService.isAuthorizedToOrganisation(
                adminAuthentication,
                new FilterInvocation("/api/clients/fintlabs_no", HttpMethod.GET.name()),
                authorizationService.getSecurePaths()
        )

        then:
        isAuthorizedToOrganisation == ACCESS_DENIED
    }
}
