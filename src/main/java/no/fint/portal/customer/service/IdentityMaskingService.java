package no.fint.portal.customer.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.collect.ImmutableBiMap;
import com.google.common.hash.HashFunction;
import com.google.common.hash.Hashing;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.model.contact.Contact;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.stream.Collectors;

@Service
@Slf4j
public class IdentityMaskingService {

    private ImmutableBiMap<String, String> identityMap;
    private final ReadWriteLock readWriteLock = new ReentrantReadWriteLock();
    private final SecureRandom random;
    private final PortalApiService portalApiService;

    public IdentityMaskingService(
            RestTemplateBuilder builder,
            PortalApiService portalApiService,
            @Value("${fint.drand.uri:https://drand.cloudflare.com}") String rootUri
    ) {
        this.portalApiService = portalApiService;
        final RestTemplate restTemplate = builder.rootUri(rootUri).build();
        final String randomness = restTemplate.getForObject("/public/latest", JsonNode.class).get("randomness").asText();
        log.info("Randomness seed: {}", randomness);
        random = new SecureRandom(Base64.getDecoder().decode(randomness));
    }

    @PostConstruct
    @Scheduled(initialDelay = 1000, fixedDelay = 3600000)
    public void rotate() {
        try {
            readWriteLock.writeLock().lock();
            final HashFunction hashFunction = Hashing.hmacSha256(random.generateSeed(256 / 8));
            final ImmutableBiMap.Builder<String, String> builder = ImmutableBiMap.builder();
            final List<Contact> contacts = portalApiService.getContacts();
            if (contacts == null || contacts.isEmpty()) {
                log.warn("Unable to retrieve contacts!");
                return;
            }

            contacts.stream().map(Contact::getNin)
                    .forEach(nin -> builder.put(nin, hashFunction.hashUnencodedChars(nin).toString()));

            identityMap = builder.build();
        } finally {
            readWriteLock.writeLock().unlock();
        }
    }

    public String mask(String nin) {
        return identityMap.get(nin);
    }

    public Contact mask(Contact input) {
        Contact output = new Contact();
        output.setFirstName(input.getFirstName());
        output.setLastName(input.getLastName());
        output.setNin(mask(input.getNin()));
        return output;
    }

    public List<Contact> getMaskedContacts() {
        return portalApiService.getContacts().stream().map(this::mask).collect(Collectors.toList());
    }
}
