import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CommonComponentService, ICommonComponent, IComponentAdapter } from '../../../api/common-component.service';

@Component({
  selector: 'app-add-adapter',
  templateUrl: './add-adapter.component.html',
  styleUrls: ['./add-adapter.component.scss']
})
export class AddAdapterComponent implements OnInit {
  adapterForm: FormGroup;
  componentId: number;
  component: ICommonComponent;
  userPassType: string = 'password';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private CommonComponent: CommonComponentService
  ) {
    this.route.params.subscribe(params => {
      this.componentId = +params['id'];
      this.component = CommonComponent.get(this.componentId);
    });

    if (!this.component) {
      this.router.navigate(['components/', this.componentId]);
    }

    if (!this.component.adapters) {
      this.component.adapters = <IComponentAdapter>{
        id: null,
        componentId: this.componentId,
        name: null,
        apiKey: this.CommonComponent.generateUUID(),
        apiSecret: this.CommonComponent.generateSecret(),
        isConfirmed: false
      }
    }

    this.adapterForm = fb.group({
      name: [this.component.adapters.name, [Validators.required]],
      confirmation: [this.component.adapters.isConfirmed, [Validators.required]],
      username: new FormControl({ value: this.component.adapters.apiKey, disabled: true }, Validators.required),
      password: new FormControl({ value: this.component.adapters.apiSecret, disabled: true }, Validators.required)
    });
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
    let userNameCtrl = this.adapterForm.controls['username'];
    userNameCtrl.setValue(this.CommonComponent.generateUUID(), { onlySelf: true });

    let passwordCtrl = this.adapterForm.controls['password'];
    passwordCtrl.setValue(this.CommonComponent.generateSecret(), { onlySelf: true });
  }

  save(model: IComponentAdapter, isValid: boolean) {
    if (isValid) {
      if (!model.componentId) { model.componentId = this.componentId; }
      this.CommonComponent.saveAdapter(model);
    }
    this.router.navigate(['components/', this.componentId]);
  }
}
