package no.fint.portal.customer.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.collect.ImmutableBiMap;
import com.google.common.hash.HashFunction;
import com.google.common.hash.Hashing;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.model.contact.Contact;
import no.fint.portal.model.contact.ContactObjectService;
import no.fint.portal.model.organisation.Organisation;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.stream.Collectors;

@Service
@Slf4j
public class IdentityMaskingService {

    public static final String BULLETS = "\u2022\u2022\u2022\u2022\u2022";

    private ImmutableBiMap<String, String> identityMap;
    private final ReadWriteLock readWriteLock = new ReentrantReadWriteLock();
    private final SecureRandom random;
    private final PortalApiService portalApiService;
    private final ContactObjectService contactObjectService;

    public IdentityMaskingService(
            RestTemplateBuilder builder,
            PortalApiService portalApiService,
            @Value("${fint.drand.uri:https://api.drand.sh}") String rootUri,
            ContactObjectService contactObjectService) {
        this.portalApiService = portalApiService;
        this.contactObjectService = contactObjectService;
        random = getSecureRandom(builder, rootUri);
    }

    private SecureRandom getSecureRandom(RestTemplateBuilder builder, String rootUri) {
        try {
            final RestTemplate restTemplate = builder.rootUri(rootUri).build();
            final String randomness = restTemplate.getForObject("/public/latest", JsonNode.class).get("randomness").asText();
            log.info("Randomness seed: {}", randomness);
            return new SecureRandom(Base64.getDecoder().decode(randomness));
        } catch (HttpClientErrorException e) {
            log.warn("Unable to get a random seed: {}", e.getResponseBodyAsString());
            return new SecureRandom();
        }
    }

    @Scheduled(cron = "${fint.identity.rotate.cron}")
    public void rotate() {
        log.info("Rotating keys ...");
        try {
            readWriteLock.writeLock().lock();
            final HashFunction hashFunction = Hashing.hmacMd5(random.generateSeed(128 / 8));
            final ImmutableBiMap.Builder<String, String> builder = ImmutableBiMap.builder();
            final List<Contact> contacts = portalApiService.getContacts();
            if (contacts == null || contacts.isEmpty()) {
                log.warn("Unable to retrieve contacts!");
                return;
            }

            contacts.forEach(contact -> {
                String nin = contact.getNin();
                final String hash = hashFunction.hashUnencodedChars(nin).toString();
                builder.put(nin, hash);
                builder.put(contact.getDn(), contactObjectService.getContactDn(hash));
            });

            identityMap = builder.build();
        } finally {
            readWriteLock.writeLock().unlock();
        }
        log.info("Map contains {} entries", identityMap.size());
    }

    public String mask(String nin) {
        if (identityMap == null || identityMap.isEmpty()) {
            rotate();
        }
        return identityMap.get(nin);
    }

    public String unmask(String hash) {
        if (identityMap == null || identityMap.isEmpty()) {
            rotate();
        }
        return identityMap.inverse().get(hash);
    }

    public Contact mask(Contact input) {
        Contact output = new Contact();
        output.setDn(mask(input.getDn()));
        output.setFirstName(input.getFirstName());
        output.setLastName(input.getLastName());
        output.setNin(mask(input.getNin()));
        output.setMail(BULLETS);
        output.setMobile(BULLETS);
        return output;
    }

    public Organisation mask(Organisation input) {
        Organisation output = new Organisation();
        BeanUtils.copyProperties(input, output);
        output.setLegalContact(mask(input.getLegalContact()));
        output.setTechicalContacts(input.getTechicalContacts().stream().map(this::mask).collect(Collectors.toList()));
        return output;
    }

    public List<Contact> getMaskedContacts() {
        return portalApiService.getContacts().stream().filter(it -> StringUtils.isNotBlank(it.getDn())).map(this::mask).collect(Collectors.toList());
    }

}
