import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICommonComponent } from 'app/api/ICommonComponent';
import { CommonComponentService } from 'app/views/components/common-component.service';
import { IComponentAdapter } from 'app/api/IComponentAdapter';

@Component({
  selector: 'app-add-adapter',
  templateUrl: './add-adapter.component.html',
  styleUrls: ['./add-adapter.component.scss']
})
export class AddAdapterComponent implements OnInit {
  adapterForm: FormGroup;
  componentId: string;
  component: ICommonComponent;
  userPassType: string = 'password';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private CommonComponent: CommonComponentService
  ) {
    this.route.params.subscribe(params => {
      this.componentId = params['id'];
      CommonComponent.getById(this.componentId).subscribe(component => this.component = component);
    });

    if (!this.component) {
      this.router.navigate(['components/', this.componentId]);
    }

    this.adapterForm = fb.group({
      name: ['', [Validators.required]],
      confirmation: ['', [Validators.required]],
      username: new FormControl({ value: '', disabled: true }, Validators.required),
      password: new FormControl({ value: '', disabled: true }, Validators.required)
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
      // if (!model.componentId) { model.componentId = this.componentId; }
      this.CommonComponent.saveAdapter(model);
    }
    this.router.navigate(['components/', this.componentId]);
  }
}
