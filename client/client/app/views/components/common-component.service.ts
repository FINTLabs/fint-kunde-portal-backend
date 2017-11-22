import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { map, finalize, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/observable/of';

import { FintDialogService } from 'fint-shared-components';

import { ICommonComponent, IComponentHALPage } from 'app/api/ICommonComponent';
import { IClient } from 'app/api/IClient';
import { IComponentAdapter } from 'app/api/IComponentAdapter';


@Injectable()
export class CommonComponentService {
  base = '/api/components';
  clientBase = '/api/clients'
  _allCompObservable: Observable<IComponentHALPage>; // Cache of all components
  _compObservableCache: [string, Observable<ICommonComponent>] = <[string, Observable<ICommonComponent>]>[];

  constructor(private http: HttpClient, private fintDialog: FintDialogService) {}

  invalidateCache() {
    delete this._allCompObservable;
    this._compObservableCache = <[string, Observable<ICommonComponent>]>[];
  }

  // ---------------------------------
  // -- Components
  // ---------------------------------
  all(): Observable<IComponentHALPage> {
    if (!this._allCompObservable) {
      this._allCompObservable =  this.http.get<IComponentHALPage>(this.base)
        .pipe(map(result => {
          const allComponents     = result;
          this._allCompObservable = Observable.of(allComponents);
          return allComponents;
        }));
    }
    return this._allCompObservable;
  }

  getById(compUuid: string): Observable<ICommonComponent> {
    if (!this._compObservableCache[compUuid]) {
      this._compObservableCache[compUuid] = this.http.get<ICommonComponent>(`${this.base}/${compUuid}`)
        .pipe(map(result => {
          const component = result;
          this._compObservableCache[compUuid] = Observable.of(component);
          return component;
        }));
    }
    return this._compObservableCache[compUuid];
  }

  removeFromOrganisation(component: ICommonComponent) {
    return this.http.delete<ICommonComponent>(`${this.base}/${component.uuid}/organisations`)
      .pipe(
        finalize(() => this.invalidateCache()),
        catchError(error => this.handleError(error))
      );
  }

  assignToOrganisation(component: ICommonComponent) {
    return this.http.post<ICommonComponent>(`${this.base}/${component.uuid}/organisations`, {})
    .pipe(
      finalize(() => this.invalidateCache()),
      catchError(error => this.handleError(error))
    );
  }

  // ---------------------------------
  // -- Clients
  // ---------------------------------
  allClients(): Observable<IClient[]> {
    return this.http.get<IClient[]>(`${this.clientBase}`)
      .pipe(catchError(error => this.handleError(error)));
  }

  getClient(clientUuid: string): Observable<IClient> {
    return this.http.get<IClient>(`${this.clientBase}/${clientUuid}`)
    .pipe(catchError(error => this.handleError(error)));
  }

  removeClient(client: IClient) {
    const url = `${this.clientBase}/${client.name}`;
    return this.http.delete<IClient>(url)
    .pipe(
      finalize(() => this.invalidateCache()),
      catchError(error => this.handleError(error))
    );
  }

  saveClient(client: IClient): Observable<IClient> {
    const url = `${this.clientBase}`;
    if (!client.name) { delete client.dn; delete client.name; }
    if (!client.orgId) { delete client.orgId; }
    if (!client.secret) { delete client.secret; }
    return (client.dn
      ? this.http.put<IClient>(`${url}/${client.name}`, client)
      : this.http.post<IClient>(url, client))
      .pipe(
        finalize(() => this.invalidateCache()),
        catchError(error => this.handleError(error))
      );
  }

  resetClientPassword(client: IClient) {
    return this.http.put<IClient>(`${this.clientBase}/${client.name}/password`, {})
      .pipe(catchError(error => this.handleError(error)));
  }

  // ---------------------------------
  // -- Adapters
  // ---------------------------------
  allAdapters(compUuid: string): Observable<IComponentAdapter[]> {
    return this.http.get<IComponentAdapter[]>(`${this.base}/${compUuid}/organisations/adapters`)
      .pipe(catchError(error => this.handleError(error)));
  }

  getAdapter(compUuid: string, adapterUuid: string): Observable<IComponentAdapter> {
    return this.http.get<IComponentAdapter>(`${this.base}/${compUuid}/organisations/adapters/${adapterUuid}`)
      .pipe(catchError(error => this.handleError(error)));
  }

  removeAdapter(compUuid: string, adapter: IComponentAdapter) {
    const url = `${this.base}/${compUuid}/organisations/adapters/${adapter.uuid}`;
    return this.http.delete<IComponentAdapter>(url)
    .pipe(
      finalize(() => this.invalidateCache()),
      catchError(error => this.handleError(error))
    );
  }

  saveAdapter(compUuid: string, adapter: IComponentAdapter): Observable<IComponentAdapter> {
    const url = `${this.base}/${compUuid}/organisations/adapters`;
    if (!adapter.uuid) { delete adapter.dn; delete adapter.uuid; }
    if (!adapter.orgId) { delete adapter.orgId; }
    if (!adapter.secret) { delete adapter.secret; }
    delete adapter.confirmation;
    return (adapter.uuid
      ? this.http.put<IComponentAdapter>(`${url}/${adapter.uuid}`, adapter)
      : this.http.post<IComponentAdapter>(url, adapter))
      .pipe(
        finalize(() => this.invalidateCache()),
        catchError(error => this.handleError(error))
      );
  }

  resetAdapterPassword(compUuid: string, adapter: IComponentAdapter) {
    return this.http.put<IComponentAdapter>(`${this.base}/${compUuid}/organisations/adapters/${adapter.uuid}/password`, {})
    .pipe(catchError(error => this.handleError(error)));
  }

  handleError(error) {
    console.log(error);
    this.fintDialog.displayHttpError(error);
    return ErrorObservable.create(error);
  }
}
