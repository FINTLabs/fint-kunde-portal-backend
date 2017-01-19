import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CommonComponentService } from '../common-component.service';
import { ICommonComponent } from 'app/api/ICommonComponent';
import { each } from 'lodash';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.scss']
})
export class AddComponentComponent implements OnInit {
  components: ICommonComponent[] = [];

  get componentsNotConfigured(): ICommonComponent[] {
    if (this.components && this.components.length) {
      return this.components.filter(comp => !comp.configured);
    }
    return this.components;
  }
  get configuredComponents(): ICommonComponent[] {
    if (this.components && this.components.length) {
      return this.components.filter(comp => comp.configured);
    }
    return this.components;
  }

  constructor(private CommonComponent: CommonComponentService, private router: Router) {
    this.loadComponents();
  }

  ngOnInit() {  }

  loadComponents() {
    const me = this;
    this.CommonComponent.all().subscribe(result => {
      if (result._embedded.componentDtoList) {
        me.components = result._embedded.componentDtoList
          .map(comp => {
            comp.wasConfigured = comp.configured;
            return comp;
          });
      }
    });
  }

  save() {
    Promise.all([
      // Assign all components set
      Promise.all(this.components
        .filter(comp => (comp.wasConfigured != comp.configured && comp.configured == true))
        .map(comp => this.CommonComponent.assignToOrganisation(comp).toPromise())),

      // Remove all components unset
      Promise.all(this.components
        .filter(comp => (comp.wasConfigured != comp.configured && comp.configured == false))
        .map(comp => this.CommonComponent.removeFromOrganisation(comp).toPromise()))
    ]).then(
      result => this.router.navigate(['/components']),
      error => this.loadComponents()
    );
  }

  transferLeft() {
    each(this.components.filter(comp => comp.isSelected), comp => {
      comp.configured = false;
      delete comp.isSelected;
    });
  }

  transferRight() {
    each(this.components.filter(comp => comp.isSelected), comp => {
      comp.configured = true;
      delete comp.isSelected;
    });
  }
}
