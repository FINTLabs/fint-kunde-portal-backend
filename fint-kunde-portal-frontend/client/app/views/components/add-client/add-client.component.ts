import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICommonComponent } from 'app/api/ICommonComponent';
import { IComponentClient } from 'app/api/IComponentClient';
import { CommonComponentService } from 'app/views/components/common-component.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  clientForm: FormGroup;
  componentId: string;
  component: ICommonComponent;

  client: IComponentClient;

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
      if (params['id']) {
        this.componentId = params[ 'id' ];
        this.CommonComponent.getById(this.componentId).subscribe(component => this.component = component);
        if (params['clientId']) {
          this.CommonComponent.getClient(this.componentId, params[ 'clientId' ]).subscribe(client => this.onClientReceived(client));
        }
      } else {
        this.router.navigate(['/components']);
      }
    });
  }

  createForm() {
    this.clientForm = this.fb.group({
      dn              : [''],
      uuid            : [''],
      shortDescription: ['', [Validators.required]],
      orgId           : [''],
      note            : [''],
      secret          : [''],
      confirmation    : ['', [Validators.required]]
    });
  }

  onClientReceived(client) {
    this.client = client;
    this.client.confirmation = true; // Since it was persisted, someone has had to check this.
    this.clientForm.setValue(this.client);
  }

  generateUserPass() {
    if (!this.clientForm.value['uuid']) {
      return this.save(this.clientForm.value, this.clientForm.valid);
    }
    this.CommonComponent.resetClientPassword(this.componentId, this.clientForm.value)
      .subscribe(result => {
        result.confirmation = this.clientForm.value.confirmation;
        this.clientForm.setValue(result);
      });
  }

  save(model: IComponentClient, isValid: boolean) {
    if (isValid) {
      this.CommonComponent.saveClient(this.componentId, model)
        .subscribe(client => this.onClientReceived(client));
    }
  }
}
