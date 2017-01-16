import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContactService } from '../contacts.service';
import { IContact } from 'app/api/IContact';

@Component({
  selector: 'app-grant',
  templateUrl: './grant.component.html',
  styleUrls: ['./grant.component.scss']
})
export class GrantComponent implements OnInit {
  userForm: FormGroup;
  contactData: IContact = <IContact>{};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private Contacts: ContactService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.Contacts.getById(params['id']).subscribe(
          result => {
            this.contactData = result;
            this.userForm.setValue(this.contactData);
          }
        );
      }
    });
  }

  createForm() {
    var EMAIL_REGEXP = "/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i";
    this.userForm = this.fb.group({
      dn: [this.contactData.dn],
      nin: [ this.contactData.nin, [ Validators.required/*, Validators.minLength(11), Validators.maxLength(11)*/]],
      firstName: [ this.contactData.firstName, [ Validators.required/*, Validators.minLength(2)*/]],
      lastName: [ this.contactData.lastName, [ Validators.required/*, Validators.minLength(2)*/]],
      mail: [ this.contactData.mail, [ Validators.required]],
      mobile: [ this.contactData.mobile, [ Validators.required/*, Validators.minLength(8)*/]],
      orgId: [this.contactData.orgId],
      primaryLegal: [this.contactData.primaryLegal],
      primaryTechnical: [this.contactData.primaryTechnical],
    });
  }

  save(model: IContact) {
    this.Contacts.save(model);
    this.router.navigate(['/access']);
  }

  onCancel() {
    this.router.navigate(['/access']);
  }
}
