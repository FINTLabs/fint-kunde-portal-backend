import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ICommonComponent } from 'app/api/ICommonComponent';
import { IComponentClient, EmptyClient } from 'app/api/IComponentClient';
import { CommonComponentService } from 'app/views/components/common-component.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  clientForm: FormGroup;
  component: ICommonComponent;
  clientId: number;

  _client: IComponentClient = new EmptyClient();
  get client() { return this._client; }
  set client(c) { this._client = c; this.clientForm.setValue(c); }

  userPassType: string = 'password';

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
        this.CommonComponent.getById(params[ 'id' ]).subscribe(component => this.component = component);
        if (params['clientId']) {
          this.CommonComponent.getClient(params[ 'id' ], params[ 'clientId' ]).subscribe(client => {
            this.client = client;
            this.clientForm.setValue(this.client);
          });
        }
      }
    });
  }

  createForm() {
    this.clientForm = this.fb.group({
      dn: [''],
      uuid: [''],
      shortDescription: [''],
      orgId: [''],
      note: ['', [Validators.required]],
      password: [''],
      confirmation: [false]
    });
  }

  toggleUserPassType() {
    //this.userPassType = (this.userPassType === 'password') ? 'text' : 'password';
  }

  generateUserPass() {
    //let userNameCtrl = this.clientForm.controls['username'];
    //userNameCtrl.setValue(this.CommonComponent.generateUUID(), { onlySelf: true });

    //let passwordCtrl = this.clientForm.controls['password'];
    //passwordCtrl.setValue(this.CommonComponent.generateSecret(), { onlySelf: true });
  }

  save(model: IComponentClient, isValid: boolean) {
    if (isValid) {
      if (!model.uuid) { delete model.dn; }
      this.CommonComponent.saveClient(model);
    }
    this.router.navigate(['../', { relativeTo: this.route }]);
  }
}
