import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/observable/of';

import { FintDialogService } from 'fint-shared-components';

import { ICommonComponent, IComponentHALPage } from 'app/api/ICommonComponent';
import { IComponentClient } from 'app/api/IComponentClient';
import { IComponentAdapter } from 'app/api/IComponentAdapter';


@Injectable()
export class CommonComponentService {
  base: string = '/api/components';

  _allCompObservable: Observable<IComponentHALPage>;

  constructor(private http: Http, private fintDialog: FintDialogService) {}

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
    return this.http.get(`${this.base}/${compUuid}`)
      .map(result => result.json())
      .catch(error => this.handleError(error));
  }

  revokeAccess(component: ICommonComponent) {
    delete this._allCompObservable;
  }

  save(component: ICommonComponent) {
    delete this._allCompObservable;
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
    delete this._allCompObservable;
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
    delete this._allCompObservable;
  }

  saveAdapter(adapter: IComponentAdapter) {
    delete this._allCompObservable;
  }

  handleError(error) {
    this.fintDialog.displayHttpError(error);
    return Observable.throw(error);
  }
}
