/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContactService } from './contacts.service';

describe('Service: Contact', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ContactService]
    });
  });

  it('should ...', inject([ ContactService], (service: ContactService) => {
    expect(service).toBeTruthy();
  }));
});
