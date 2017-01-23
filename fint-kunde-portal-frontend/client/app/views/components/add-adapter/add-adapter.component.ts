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
      dn              : [''],
      uuid            : [''],
      shortDescription: ['', [Validators.required]],
      orgId           : [''],
      note            : [''],
      secret          : [''],
      confirmation    : ['', [Validators.required]]
    });
  }

  onAdapterReceived(adapter) {
    this.adapter = adapter;
    this.adapter.confirmation = true; // Since it was persisted, someone has had to check this.
    this.adapterForm.setValue(this.adapter);
  }

  generateUserPass() {
    if (!this.adapterForm.value['uuid']) {
      return this.save(this.adapterForm.value, this.adapterForm.valid);
    }
    this.CommonComponent.resetAdapterPassword(this.componentId, this.adapterForm.value)
      .subscribe(result => {
        result.confirmation = this.adapterForm.value.confirmation;
        this.adapterForm.setValue(result);
      });
  }

  save(model: IComponentAdapter, isValid: boolean) {
    if (isValid) {
      this.CommonComponent.saveAdapter(this.componentId, model)
        .subscribe(adapter => this.onAdapterReceived(adapter));
    }
  }
}
