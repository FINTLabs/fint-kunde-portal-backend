package no.fint.portal.customer.service;

import no.fint.portal.customer.exception.InvalidResourceException;
import no.fint.portal.exceptions.EntityNotFoundException;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class PortalApiService {
  @Autowired
  private ComponentService componentService;

  @Autowired
  private OrganisationService organisationService;

  @Autowired
  private AdapterService adapterService;

  @Autowired
  private ClientService clientService;

  @Autowired
  private AssetService assetService;

  @Autowired
  private ContactService contactService;

  public Organisation getOrganisation(String orgName) {
    return organisationService.getOrganisation(orgName).orElseThrow(() -> new EntityNotFoundException("Organisation " + orgName + " not found."));
  }

  public Component getComponent(String compName) {
    return componentService.getComponentByName(compName).orElseThrow(() -> new EntityNotFoundException("Component " + compName + " not found."));
  }

  @Retryable(
    backoff = @Backoff(delay = 200L),
    value = {InvalidResourceException.class},
    maxAttempts = 5
  )
  public List<Client> getClients(Organisation organisation) {
    List<Client> clients = clientService.getClients(organisation.getName());

    if (clients.size() > 0) {
      if (clients.get(0).getName() == null) {
        throw new InvalidResourceException("Invalid client");
      }
    }
    else {
      return Collections.emptyList();
    }

    return clients;
  }
  public Client getClient(Organisation organisation, String clientName) {
    return clientService.getClient(clientName, organisation.getName()).orElseThrow(() -> new EntityNotFoundException("Client " + clientName + " not found."));
  }

  public Adapter getAdapter(Organisation organisation, String adapterName) {
    return adapterService.getAdapter(adapterName, organisation.getName()).orElseThrow(() -> new EntityNotFoundException("Adapter " + adapterName + " not found"));
  }

  @Retryable(
    backoff = @Backoff(delay = 200L),
    value = {InvalidResourceException.class},
    maxAttempts = 5
  )
  public List<Asset> getAssets(Organisation organisation) {
    List<Asset> assets = assetService.getAssets(organisation);
    if (assets.size() > 0) {
      if (assets.get(0).getAssetId() == null) {
        throw new InvalidResourceException("Invalid Asset");
      }
    }
    else {
      return Collections.emptyList();
    }
    return assets;
  }
  public Asset getAsset(Organisation organisation, String assetId) {
    return assetService.getAssets(organisation).stream().filter(a -> assetId.equals(a.getName())).findAny().orElseThrow(() -> new EntityNotFoundException("Asset " + assetId + " not found."));
  }

  public Contact getContact(String nin) {
    return contactService.getContact(nin).orElseThrow(() -> new EntityNotFoundException("Contact " + nin + " not found."));
  }
}
