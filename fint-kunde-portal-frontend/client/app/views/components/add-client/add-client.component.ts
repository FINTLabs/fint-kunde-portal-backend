import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
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
  componentId: number;
  component: ICommonComponent;
  clientId: number;
  client: IComponentClient;
  userPassType: string = 'password';

  showStilling: boolean;
  showArbeidstaker: boolean;
  arbeidstaker: {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private CommonComponent: CommonComponentService
  ) {
    this.route.params.subscribe(params => {
      CommonComponent.getById(params['id']).subscribe(component => this.component = component);
      CommonComponent.getClient(params['id'], params['clientId']).subscribe(client => this.client = client);
    });

    if (!this.client) {
      this.client = <IComponentClient>{
        id: null,
        componentId: this.componentId,
        name: null,
        apiKey: this.CommonComponent.generateUUID(),
        apiSecret: this.CommonComponent.generateSecret(),
        isConfirmed: false
      };
    }

    this.clientForm = fb.group({
      name: ['', [Validators.required]],
      confirmation: ['', [Validators.required]],
      username: new FormControl({ value: '', disabled: true }, Validators.required),
      password: new FormControl({ value: '', disabled: true }, Validators.required)
    });

    this.arbeidstaker = {
      enabled: true,
      firstname: true,
      lastname: true,
      email: true,
      phone: true,
      stilling: {
        enabled: true,
        avdeling: true,
        grunnlonn: true,
        stillingskode: true
      },
      ansattnr: true,
      birthnumber: true
    };
  }

  ngOnInit() {
  }

  onCancel() {
    this.router.navigate(['components/', this.componentId]);
  }

  toggleUserPassType() {
    this.userPassType = (this.userPassType === 'password') ? 'text' : 'password';
  }

  generateUserPass() {
    let userNameCtrl = this.clientForm.controls['username'];
    userNameCtrl.setValue(this.CommonComponent.generateUUID(), { onlySelf: true });

    let passwordCtrl = this.clientForm.controls['password'];
    passwordCtrl.setValue(this.CommonComponent.generateSecret(), { onlySelf: true });
  }

  save(model: IComponentClient, isValid: boolean) {
    if (isValid) {
      if (!model.componentId) { model.componentId = this.componentId; }
      this.CommonComponent.saveClient(model);
    }
    this.router.navigate(['components/', this.componentId]);
  }
}
