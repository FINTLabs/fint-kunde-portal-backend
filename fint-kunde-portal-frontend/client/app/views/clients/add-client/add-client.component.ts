import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICommonComponent } from 'app/api/ICommonComponent';
import { IClient } from 'app/api/IClient';
import { CommonComponentService } from 'app/views/components/common-component.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  clientForm: FormGroup;
  component: ICommonComponent;

  client: IClient;

  isNew = true;
  showPassword = false;
  showClientId = false;
  showSecret = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private CommonComponent: CommonComponentService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.CommonComponent.getClient(params.id).subscribe(client => this.onClientReceived(client));
      }
    });
  }

  createForm() {
    this.clientForm = this.fb.group({
      dn               : [''],
      name             : ['', [Validators.required, Validators.pattern('[A-Za-z0-9\-\]{6,20}')]],
      shortDescription : ['', [Validators.required]],
      orgId            : [''],
      note             : [''],
      secret           : [''],
      clientId         : [''],
      clientSecret     : ['']
    });
  }

  onClientReceived(client) {
    this.client = client;
    this.clientForm.setValue({
      dn               : this.client.dn,
      name             : this.client.name,
      shortDescription : this.client.shortDescription,
      orgId            : this.client.orgId,
      note             : this.client.note,
      secret           : this.client.secret,
      clientId         : this.client.clientId,
      clientSecret     : this.client.clientSecret,
    });
    this.isNew = false;
  }

  isEdit() {
    if (this.client === undefined) {
      return false;
    }
    if (this.client.name == null) {
      return false;
    }
    return true;
  }

  generateUserPass() {
    /*
    if (!this.clientForm.value['secret']) {
      return this.save(this.clientForm.value, this.clientForm.valid);
    }
    */
    this.CommonComponent.resetClientPassword(this.client /*this.clientForm.value*/)
      .subscribe((result: any) => {
        result.confirmation = this.clientForm.value.confirmation;
        this.clientForm.setValue(result);
      });
  }

  save(model: IClient, isValid: boolean) {
    if (isValid) {
      this.CommonComponent.saveClient(model)
        .subscribe(client => this.onClientReceived(client));
    }
  }
}
