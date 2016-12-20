import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

export interface IPerson {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  access: boolean;
}
@Injectable()
export class PersonService {
  persons: IPerson[];

  constructor(http: Http) {
    this.persons = [
      { id: 10000000001, firstName: 'Frode', lastName: 'Sjovatsen', email: 'frode.sjovatsen@rogfk.no', phone: '', access: true },
      { id: 11111111111, firstName: 'Øystein', lastName: 'Amundsen', email: 'oystein.amundsen@bouvet.no', phone: '48019009', access: true },
      { id: 22222222222, firstName: 'Jarle', lastName: '', email: '', phone: '', access: true },
      { id: 33333333333, firstName: 'Ole Anders', lastName: '', email: '', phone: '', access: true },
    ];
  }

  all() {
    return this.persons;
  }

  allWithAccess() {
    return this.persons.filter(person => person.access === true);
  }

  revokeAccess(person: IPerson) {
    let index = this.persons.findIndex(item => item.id === person.id);
    this.persons[index].access = false;
  }

  save(person: IPerson) {
    let index = this.persons.findIndex(item => item.id === person.id);
    person.access = true;
    this.persons[index] = person;
  }
}
