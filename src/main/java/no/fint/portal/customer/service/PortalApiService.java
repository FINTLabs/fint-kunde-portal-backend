package no.fint.portal.customer.service;

import lombok.Synchronized;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.customer.exception.InvalidResourceException;
import no.fint.portal.exceptions.EntityNotFoundException;
import no.fint.portal.model.access.AccessPackage;
import no.fint.portal.model.access.AccessService;
import no.fint.portal.model.adapter.Adapter;
import no.fint.portal.model.adapter.AdapterService;
import no.fint.portal.model.asset.Asset;
import no.fint.portal.model.asset.AssetService;
import no.fint.portal.model.client.Client;
import no.fint.portal.model.client.ClientService;
import no.fint.portal.model.component.Component;
import no.fint.portal.model.component.ComponentService;
import no.fint.portal.model.contact.Contact;
import no.fint.portal.model.contact.ContactService;
import no.fint.portal.model.organisation.Organisation;
import no.fint.portal.model.organisation.OrganisationService;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
public class PortalApiService {
    private final ComponentService componentService;

    private final OrganisationService organisationService;

    private final AdapterService adapterService;

    private final ClientService clientService;

    private final AssetService assetService;

    private final ContactService contactService;

    private final AccessService accessService;

    public PortalApiService(ComponentService componentService, OrganisationService organisationService, AdapterService adapterService, ClientService clientService, AssetService assetService, ContactService contactService, AccessService accessService) {
        this.componentService = componentService;
        this.organisationService = organisationService;
        this.adapterService = adapterService;
        this.clientService = clientService;
        this.assetService = assetService;
        this.contactService = contactService;
        this.accessService = accessService;
    }

    @Retryable(
            backoff = @Backoff(delay = 200L),
            value = {InvalidResourceException.class},
            maxAttempts = 5
    )
    @Synchronized
    public Organisation getOrganisation(String orgName) {
        Organisation organisation = organisationService.getOrganisation(orgName).orElseThrow(() -> new EntityNotFoundException("Organisation " + orgName + " not found."));
        if (organisation.getName() == null) throw new InvalidResourceException("Invalid organisation");
        return organisation;
    }

    @Retryable(
            backoff = @Backoff(delay = 200L),
            value = {InvalidResourceException.class},
            maxAttempts = 5
    )
    @Synchronized
    public List<Component> getComponents() {
        List<Component> components = componentService.getComponents();

        if (components.size() == 0) return Collections.emptyList();
        if (components.get(0).getName() == null) throw new InvalidResourceException("Invalid component");
        return components;
    }

    @Retryable(
            backoff = @Backoff(delay = 200L),
            value = {InvalidResourceException.class},
            maxAttempts = 5
    )
    @Synchronized
    public Component getComponentByName(String compName) {
        Component component = componentService.getComponentByName(compName).orElseThrow(() -> new EntityNotFoundException("Component " + compName + " not found."));
        if (component.getName() == null) throw new InvalidResourceException("Invalid component");
        return component;
    }

    @Retryable(
            backoff = @Backoff(delay = 200L),
            value = {InvalidResourceException.class},
            maxAttempts = 5
    )
    @Synchronized
    public Component getComponentByDn(String dn) {
        Component component = componentService.getComponetByDn(dn).orElseThrow(() -> new EntityNotFoundException("Component " + dn + " not found."));
        if (component.getName() == null) throw new InvalidResourceException("Invalid component");
        return component;
    }

    @Retryable(
            backoff = @Backoff(delay = 200L),
            value = {InvalidResourceException.class},
            maxAttempts = 5
    )
    @Synchronized
    public List<Client> getClients(Organisation organisation) {
        List<Client> clients = clientService.getClients(organisation.getName());

        if (clients.size() == 0) return Collections.emptyList();
        if (clients.get(0).getName() == null) throw new InvalidResourceException("Invalid client");
        return clients;
    }

    @Retryable(
            backoff = @Backoff(delay = 200L),
            value = {InvalidResourceException.class},
            maxAttempts = 5
    )
    @Synchronized
    public Client getClient(Organisation organisation, String clientName) {
        Client client = clientService.getClient(clientName, organisation.getName()).orElseThrow(() -> new EntityNotFoundException("Client " + clientName + " not found."));
        if (client.getName() == null) throw new InvalidResourceException("Invalid client");
        return client;
    }

    @Retryable(
            backoff = @Backoff(delay = 200L),
            value = {InvalidResourceException.class},
            maxAttempts = 5
    )
    @Synchronized
    public List<Adapter> getAdapters(Organisation organisation) {
        List<Adapter> adapters = adapterService.getAdapters(organisation.getName());

        if (adapters.size() == 0) return Collections.emptyList();
        if (adapters.get(0).getName() == null) throw new InvalidResourceException("Invalid adapter");
        return adapters;
    }

    @Retryable(
            backoff = @Backoff(delay = 200L),
            value = {InvalidResourceException.class},
            maxAttempts = 5
    )
    @Synchronized
    public Adapter getAdapter(Organisation organisation, String adapterName) {
        Adapter adapter = adapterService.getAdapter(adapterName, organisation.getName()).orElseThrow(() -> new EntityNotFoundException("Adapter " + adapterName + " not found"));
        if (adapter.getName() == null) throw new InvalidResourceException("Invalid adapter");
        return adapter;
    }

    @Retryable(
            backoff = @Backoff(delay = 200L),
            value = {InvalidResourceException.class},
            maxAttempts = 5
    )
    @Synchronized
    public List<Asset> getAssets(Organisation organisation) {
        List<Asset> assets = assetService.getAssets(organisation);

        if (assets.size() == 0) return Collections.emptyList();
        if (assets.get(0).getName() == null) throw new InvalidResourceException("Invalid asset");
        return assets;
    }

    @Retryable(
            backoff = @Backoff(delay = 200L),
            value = {InvalidResourceException.class},
            maxAttempts = 5
    )
    @Synchronized
    public Asset getAsset(Organisation organisation, String assetId) {
        Asset asset = assetService.getAssets(organisation).stream().filter(a -> assetId.equals(a.getName())).findAny().orElseThrow(() -> new EntityNotFoundException("Asset " + assetId + " not found."));
        if (asset.getName() == null) throw new InvalidResourceException("Invalid asset");
        return asset;
    }

    @Retryable(
            backoff = @Backoff(delay = 200L),
            value = {InvalidResourceException.class},
            maxAttempts = 5
    )
    @Synchronized
    public List<Contact> getContacts() {
        List<Contact> contacts = contactService.getContacts();
        if (contacts == null) throw new InvalidResourceException("null Contacts");
        if (contacts.size() == 0) return Collections.emptyList();
        if (contacts.get(0).getFirstName() == null) throw new InvalidResourceException("Invalid contact");
        return contacts;
    }

    @Retryable(
            backoff = @Backoff(delay = 200L),
            value = {InvalidResourceException.class},
            maxAttempts = 5
    )
    @Synchronized
    public Contact getContact(String nin) {
        Contact contact = contactService.getContact(nin).orElseThrow(() -> {
            log.error("Couldn't find contact with nin {}", nin);
            return new EntityNotFoundException("Contact " + nin + " not found.");
        });

        if (contact.getFirstName() == null) {
            log.error("Invalid contact with nin " + nin);
            throw new InvalidResourceException("Invalid contact");
        }

        return contact;
    }

    @Retryable(
            backoff = @Backoff(delay = 200L),
            value = {InvalidResourceException.class},
            maxAttempts = 5
    )
    @Synchronized
    public List<AccessPackage> getAccesses(Organisation organisation) {
        return accessService.getAccesses(organisation.getName());
    }

    @Retryable(
            backoff = @Backoff(delay = 200L),
            value = {InvalidResourceException.class},
            maxAttempts = 5
    )
    @Synchronized
    public AccessPackage getAccess(Organisation organisation, String accessId) {
        return accessService.getAccess(accessId, organisation.getName());
    }
}
