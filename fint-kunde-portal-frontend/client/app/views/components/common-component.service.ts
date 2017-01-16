import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { FintDialogService } from 'fint-shared-components';

import { ICommonComponent, IComponentHALPage } from 'app/api/ICommonComponent';
import { IComponentClient } from 'app/api/IComponentClient';
import { IComponentAdapter } from 'app/api/IComponentAdapter';


@Injectable()
export class CommonComponentService {
  base: string = '/api/components';

  constructor(private http: Http, private fintDialog: FintDialogService) {}

  generateUUID() {
    function s(n) { return h((Math.random() * (1 << (n << 2))) ^ Date.now()).slice(-n); }
    function h(n) { return (n | 0).toString(16); }
    return [
      s(4) + s(4), s(4),
      '4' + s(3),                    // UUID version 4
      h(8 | (Math.random() * 4)) + s(3), // {8|9|A|B}xxx
      // s(4) + s(4) + s(4),
      Date.now().toString(16).slice(-10) + s(2) // Use timestamp to avoid collisions
    ].join('-');
  }

  generateSecret() {
    let cc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-=!@#$%^&*()_+:<>{}[]".split('');
    let key = '';
    for (let i = 0; i < 50; i++) key += cc[Math.floor(Math.random() * cc.length)];
    return key;
  }

  // ---------------------------------
  // -- Components
  // ---------------------------------
  all(): Observable<IComponentHALPage> {
    return this.http.get(this.base)
      .map(result => result.json())
      .catch(error => this.handleError(error));
  }

  getById(compUuid: string) {
    return this.http.get(`${this.base}/${compUuid}`)
      .map(result => result.json())
      .catch(error => this.handleError(error));
  }

  revokeAccess(component: ICommonComponent) {
  }

  save(component: ICommonComponent) {
  }

  // ---------------------------------
  // -- Clients
  // ---------------------------------
  allClients(compUuid: string) {
    return this.http.get(`${this.base}/${compUuid}/organisations/clients`)
      .map(result => result.json())
      .catch(error => this.handleError(error));
  }

  getClient(compUuid: string, clientUuid: string): Observable<IComponentClient> {
    return this.http.get(`${this.base}/${compUuid}/organisations/clients/${clientUuid}`)
      .map(result => result.json())
      .catch(error => this.handleError(error));
  }

  saveClient(client: IComponentClient) {
  }

  // ---------------------------------
  // -- Adapters
  // ---------------------------------
  allAdapters(compUuid: string) {
    return this.http.get(`${this.base}/${compUuid}/organisations/adapters`)
      .map(result => result.json())
      .catch(error => this.handleError(error));
  }

  getAdapter(compUuid: string, adapterUuid: string) {
    return this.http.get(`${this.base}/${compUuid}/organisations/adapters/${adapterUuid}`)
      .map(result => result.json())
      .catch(error => this.handleError(error));
  }

  removeAdapter(adapter: IComponentAdapter) {
  }

  saveAdapter(adapter: IComponentAdapter) {
  }

  handleError(error) {
    this.fintDialog.displayHttpError(error);
    return Observable.throw(error);
  }
}
