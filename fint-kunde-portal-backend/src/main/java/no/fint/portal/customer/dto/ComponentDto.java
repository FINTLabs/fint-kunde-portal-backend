package no.fint.portal.customer.dto;

import no.fint.portal.component.Adapter;
import no.fint.portal.component.Client;
import no.fint.portal.component.Component;

import javax.naming.Name;
import java.util.List;

/**
 * Created by oystein.amundsen on 17.01.2017.
 */
public class ComponentDto {
  private String dn;
  private String uuid;
  private String technicalName;
  private String displayName;
  private String description;

  // Extra properties
  private boolean isConfigured;
  private List<Client> clients;
  private Adapter adapter;

  public ComponentDto(Component component) {
    this.setDn(component.getDn());
    this.setUuid(component.getUuid());
    this.setTechnicalName(component.getTechnicalName());
    this.setDisplayName(component.getDisplayName());
    this.setDescription(component.getDescription());
  }

  public String getDn() {
    return dn;
  }

  public void setDn(String dn) {
    this.dn = dn;
  }

  public String getUuid() {
    return uuid;
  }

  public void setUuid(String uuid) {
    this.uuid = uuid;
  }

  public String getTechnicalName() {
    return technicalName;
  }

  public void setTechnicalName(String technicalName) {
    this.technicalName = technicalName;
  }

  public String getDisplayName() {
    return displayName;
  }

  public void setDisplayName(String displayName) {
    this.displayName = displayName;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public boolean isConfigured() {
    return isConfigured;
  }

  public void setConfigured(boolean configured) {
    isConfigured = configured;
  }

  public List<Client> getClients() {
    return clients;
  }

  public void setClients(List<Client> clients) {
    this.clients = clients;
  }

  public Adapter getAdapter() {
    return adapter;
  }

  public void setAdapter(Adapter adapter) {
    this.adapter = adapter;
  }
}
