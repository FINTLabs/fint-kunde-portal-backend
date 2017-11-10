import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/observable/of';

import { FintDialogService } from 'fint-shared-components';

import { IContactHALPage, IContact } from 'app/api/IContact';

@Injectable()
export class ContactService {
  base = '/api/contacts';

  constructor(private http: Http, private fintDialog: FintDialogService) {}

  all(): Observable<IContactHALPage> {
    return this.http.get(this.base)
      .map(result => result.json())
      .catch(error => this.handleError(error));
  }

  getById(nin): Observable<IContact> {
    return this.http.get(this.base + '/' + nin)
      .map(result => result.json())
      .catch(error => this.handleError(error));
  }

  revokeAccess(contact: IContact): Observable<any> {
    return this.http.delete(this.base + '/' + contact.nin)
      .catch(error => this.handleError(error));
  }

  save(contact: IContact): Observable<IContact> {
    if (!contact.dn) { delete contact.dn; }
    const call = (contact.dn) ? this.http.put(`${this.base}/${contact.nin}`, contact) : this.http.post(this.base, contact); // If exists, put - else post
    return call
      .map(result => result.json())
      .catch(error => this.handleError(error));
  }

  handleError(error) {
    this.fintDialog.displayHttpError(error);
    return Observable.throw(error);
  }
}
