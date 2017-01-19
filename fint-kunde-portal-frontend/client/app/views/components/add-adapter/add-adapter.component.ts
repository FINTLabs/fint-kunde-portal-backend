import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICommonComponent } from 'app/api/ICommonComponent';
import { IComponentAdapter } from 'app/api/IComponentAdapter';
import { CommonComponentService } from 'app/views/components/common-component.service';

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

  adapter: IComponentAdapter;

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
        this.CommonComponent.getById(this.componentId).subscribe(component => {
          this.component = component;
          if (this.component.adapter) {
            this.CommonComponent.getAdapter(this.componentId, this.component.adapter.uuid)
              .subscribe(adapter => this.onAdapterReceived(adapter));
          }
        });
      } else {
        this.router.navigate(['/components']);
      }
    });
  }

  createForm() {
    this.adapterForm = this.fb.group({
      dn: [''],
      uuid: [''],
      shortDescription: ['', [Validators.required]],
      orgId: [''],
      note: [''],
      password: [''],
      confirmation: ['', [Validators.required]]
    });
  }

  onAdapterReceived(adapter) {
    this.adapter = adapter;
    this.adapterForm.setValue(this.adapter);
  }

  toggleUserPassType() {
    this.userPassType = (this.userPassType === 'password') ? 'text' : 'password';
  }

  generateUserPass() {
    //let userNameCtrl = this.adapterForm.controls['username'];
    //userNameCtrl.setValue(this.CommonComponent.generateUUID(), { onlySelf: true });

    //let passwordCtrl = this.adapterForm.controls['password'];
    //passwordCtrl.setValue(this.CommonComponent.generateSecret(), { onlySelf: true });
  }

  save(model: IComponentAdapter, isValid: boolean) {
    if (isValid) {
      this.CommonComponent.saveAdapter(this.componentId, model)
        .subscribe(adapter => this.onAdapterReceived(adapter));
    }
  }
}
