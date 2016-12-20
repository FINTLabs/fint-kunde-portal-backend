import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CommonComponentService, IEditableComponent } from '../../../api/common-component.service';

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.scss']
})
export class AddComponentComponent implements OnInit {
  components: IEditableComponent[];
  get componentsNotConfigured(): IEditableComponent[] {
    return this.components.filter(comp => this.configuredComponents.findIndex(confComp => confComp.id === comp.id) === -1);
  }
  get configuredComponents(): IEditableComponent[] {
    return <IEditableComponent[]>this.CommonComponent.allConfigured();
  }

  constructor(private CommonComponent: CommonComponentService, private router: Router) {
    this.components = <IEditableComponent[]>CommonComponent.all();
  }

  ngOnInit() {
  }

  save() {
    this.router.navigate(['/components']);
  }

  transferLeft() {
    let selected = this.configuredComponents.filter(comp => comp.isSelected);
    selected.forEach(comp => comp.isConfigured = false);
  }

  transferRight() {
    let selected = this.componentsNotConfigured.filter(comp => comp.isSelected);
    selected.forEach(comp => comp.isConfigured = true);
  }
}
