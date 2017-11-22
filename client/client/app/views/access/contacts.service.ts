import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { FintDialogService } from 'fint-shared-components';

import { IContactHALPage, IContact } from 'app/api/IContact';

@Injectable()
export class ContactService {
  base = '/api/contacts';

  constructor(private http: HttpClient, private fintDialog: FintDialogService) {}

  all(): Observable<IContactHALPage> {
    return this.http.get<IContactHALPage>(this.base)
      .pipe(catchError(err => this.handleError(err)));
  }

  getById(nin): Observable<IContact> {
    return this.http.get<IContact>(this.base + '/' + nin)
      .pipe(catchError(err => this.handleError(err)));
  }

  revokeAccess(contact: IContact): Observable<any> {
    return this.http.delete(this.base + '/' + contact.nin)
      .pipe(catchError(err => this.handleError(err)));
  }

  save(contact: IContact): Observable<IContact> {
    if (!contact.dn) { delete contact.dn; }
    return ((contact.dn)
      ? this.http.put<IContact>(`${this.base}/${contact.nin}`, contact)
      : this.http.post<IContact>(this.base, contact)) // If exists, put - else post
        .pipe(catchError(err => this.handleError(err)));
    }

  handleError(error) {
    this.fintDialog.displayHttpError(error);
    return ErrorObservable.create(error);
  }
}
