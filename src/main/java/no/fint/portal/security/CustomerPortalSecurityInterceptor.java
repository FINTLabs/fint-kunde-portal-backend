package no.fint.portal.security;

import lombok.extern.slf4j.Slf4j;
import no.fint.portal.customer.exception.ForbiddenException;
import no.fint.portal.customer.exception.InvalidResourceException;
import no.fint.portal.exceptions.EntityNotFoundException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;

@Service
@Slf4j
public class CustomerPortalSecurityInterceptor implements HandlerInterceptor {

    @Autowired
    private UserService userService;

    @Value("${fint.portal.secure.paths:/api/adapters/,/api/assets/,/api/clients/,/api/components/organisation/,/api/organisations/}")
    private String[] securePaths;

    @PostConstruct
    public void init() {
        log.info("Secure paths: {}", Arrays.toString(securePaths));
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (StringUtils.isBlank(request.getHeader("x-nin"))) {
            throw new ForbiddenException();
        }

        final User user = getUser(request);
        log.debug("User: {}", user);
        Arrays.stream(securePaths)
                .filter(it -> StringUtils.startsWith(request.getServletPath(), it))
                .findFirst()
                .map(path ->
                        StringUtils.substringBefore(
                                StringUtils.replaceIgnoreCase(
                                        request.getServletPath(),
                                        path,
                                        ""
                                ),
                                "/")
                )
                .ifPresent(org -> {
                    log.debug("Org: {}", org);
                    if (!user.getOrganizations().contains(org)) {
                        log.warn("User {} has no access to {}!!!", user.getId(), org);
                        throw new ForbiddenException();
                    }
                });

        return true;
    }

    private User getUser(HttpServletRequest request) {
        try {
            return userService.getUser(request.getHeader("x-nin"));
        } catch (EntityNotFoundException | InvalidResourceException e) {
            throw new ForbiddenException();
        }
    }

}
