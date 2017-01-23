import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';
import 'rxjs/observable/of';

import { FintDialogService } from 'fint-shared-components';

import { ICommonComponent, IComponentHALPage } from 'app/api/ICommonComponent';
import { IComponentClient } from 'app/api/IComponentClient';
import { IComponentAdapter } from 'app/api/IComponentAdapter';


@Injectable()
export class CommonComponentService {
  base: string = '/api/components';

  constructor(private http: Http, private fintDialog: FintDialogService) {}

  _allCompObservable: Observable<IComponentHALPage>; // Cache of all components
  _compObservableCache: [string, Observable<ICommonComponent>] = <[string, Observable<ICommonComponent>]>[];
  invalidateCache() {
    delete this._allCompObservable;
    this._compObservableCache = <[string, Observable<ICommonComponent>]>[];
  }

  // ---------------------------------
  // -- Components
  // ---------------------------------
  all(): Observable<IComponentHALPage> {
    if (!this._allCompObservable) {
      this._allCompObservable = this.http.get(this.base)
        .map(result => {
          let allComponents       = result.json();
          this._allCompObservable = Observable.of(allComponents);
          return allComponents;
        })
        .share()
        .catch(error => this.handleError(error));
    }
    return this._allCompObservable;
  }

  getById(compUuid: string) {
    if (!this._compObservableCache[compUuid]) {
      this._compObservableCache[compUuid] = this.http.get(`${this.base}/${compUuid}`)
        .map(result => {
          let component = result.json();
          this._compObservableCache[compUuid] = Observable.of(component);
          return component;
        })
        .share()
        .catch(error => this.handleError(error));
    }
    return this._compObservableCache[compUuid];
  }

  removeFromOrganisation(component: ICommonComponent) {
    return this.http.delete(`${this.base}/${component.uuid}/organisations`)
      .finally(() => this.invalidateCache())
      .catch(error => this.handleError(error));
  }

  assignToOrganisation(component: ICommonComponent) {
    return this.http.post(`${this.base}/${component.uuid}/organisations`, {})
      .finally(() => this.invalidateCache())
      .catch(error => this.handleError(error));
  }

  // ---------------------------------
  // -- Clients
  // ---------------------------------
  allClients(compUuid: string): Observable<IComponentClient[]> {
    return this.http.get(`${this.base}/${compUuid}/organisations/clients`)
      .map(result => result.json())
      .catch(error => this.handleError(error));
  }

  getClient(compUuid: string, clientUuid: string): Observable<IComponentClient> {
    return this.http.get(`${this.base}/${compUuid}/organisations/clients/${clientUuid}`)
      .map(result => result.json())
      .catch(error => this.handleError(error));
  }

  removeClient(compUuid: string, client: IComponentClient) {
    let url = `${this.base}/${compUuid}/organisations/clients/${client.uuid}`;
    return this.http.delete(url)
      .finally(() => this.invalidateCache())
      .catch(error => this.handleError(error));
  }

  saveClient(compUuid: string, client: IComponentClient): Observable<IComponentClient> {
    let url = `${this.base}/${compUuid}/organisations/clients`;
    if (!client.uuid) { delete client.dn; delete client.uuid; }
    if (!client.orgId) { delete client.orgId; }
    if (!client.secret) { delete client.secret; }
    delete client.confirmation;
    return (client.uuid ? this.http.put(`${url}/${client.uuid}`, client) : this.http.post(url, client))
      .map(result => result.json())
      .finally(() => this.invalidateCache())
      .catch(error => this.handleError(error));
  }

  resetClientPassword(compUuid: string, client: IComponentClient) {
    return this.http.put(`${this.base}/${compUuid}/organisations/clients/${client.uuid}/password`, {})
      .map(result => result.json())
      .catch(error => this.handleError(error));
  }

  // ---------------------------------
  // -- Adapters
  // ---------------------------------
  allAdapters(compUuid: string): Observable<IComponentAdapter[]> {
    return this.http.get(`${this.base}/${compUuid}/organisations/adapters`)
      .map(result => result.json())
      .catch(error => this.handleError(error));
  }

  getAdapter(compUuid: string, adapterUuid: string): Observable<IComponentAdapter> {
    return this.http.get(`${this.base}/${compUuid}/organisations/adapters/${adapterUuid}`)
      .map(result => result.json())
      .catch(error => this.handleError(error));
  }

  removeAdapter(compUuid: string, adapter: IComponentAdapter) {
    let url = `${this.base}/${compUuid}/organisations/adapters/${adapter.uuid}`;
    return this.http.delete(url)
      .finally(() => this.invalidateCache())
      .catch(error => this.handleError(error));
  }

  saveAdapter(compUuid: string, adapter: IComponentAdapter): Observable<IComponentAdapter> {
    let url = `${this.base}/${compUuid}/organisations/adapters`;
    if (!adapter.uuid) { delete adapter.dn; delete adapter.uuid; }
    if (!adapter.orgId) { delete adapter.orgId; }
    if (!adapter.secret) { delete adapter.secret; }
    delete adapter.confirmation;
    return (adapter.uuid ? this.http.put(`${url}/${adapter.uuid}`, adapter) : this.http.post(url, adapter))
      .map(result => result.json())
      .finally(() => this.invalidateCache())
      .catch(error => this.handleError(error));
  }

  resetAdapterPassword(compUuid: string, adapter: IComponentAdapter) {
    return this.http.put(`${this.base}/${compUuid}/organisations/adapters/${adapter.uuid}/password`, {})
      .map(result => result.json())
      .catch(error => this.handleError(error));
  }

  handleError(error) {
    console.log(error);
    this.fintDialog.displayHttpError(error);
    return Observable.throw(error);
  }
}
