package no.fint.portal.customer.service;

import lombok.extern.slf4j.Slf4j;
import no.fint.portal.model.contact.Contact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
@ConditionalOnProperty("fint.zendesk.enabled")
public class ZendeskService {
    @Autowired @Qualifier("zendesk")
    private RestTemplate restTemplate;

    public void updateContact(Contact contact) {
        ResponseEntity<Void> response = restTemplate.exchange("/", HttpMethod.POST, new HttpEntity<>(contact), Void.class);
        log.info("Update contact result: {}", response.getStatusCode());
    }

    public void deleteContact(Contact contact) {
        ResponseEntity<Void> response = restTemplate.exchange("/", HttpMethod.DELETE, new HttpEntity<>(contact), Void.class);
        log.info("Delete contact result: {}", response.getStatusCode());
    }

}
