import { Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import {
  CommonComponentService,
  ICommonComponent,
  IComponentAdapter,
  IComponentClient,
  IEditableComponent
} from '../../../api/common-component.service';

export interface ComponentUpdatedEvent {
  component: IEditableComponent;
  updated: ICommonComponent;
}
@Component({
  selector: '[appComponentEditor]',
  templateUrl: './component-editor.component.html',
  styleUrls: ['./component-editor.component.scss']
})
export class ComponentEditorComponent implements OnInit {
  @Input('appComponentEditor') component;
  @Output() componentChange: EventEmitter<ComponentUpdatedEvent> = new EventEmitter<ComponentUpdatedEvent>();
  @Output() onEdit: EventEmitter<ComponentUpdatedEvent> = new EventEmitter<ComponentUpdatedEvent>();

  _updated: ICommonComponent;
  get updated() {
    if (!this._updated) {
      this._updated = JSON.parse(JSON.stringify(this.component));
      delete (<IEditableComponent>this._updated).isEdit;
    }
    return this._updated;
  }


  constructor(private router: Router, private CommonComponent: CommonComponentService) {
  }

  ngOnInit() { }

  toggleEditComponent() {
    if (!this.component.isEdit) { // Opening editor.
      this._updated = null;       // Reset component data clone
    }
    this.onEdit.emit({ component: this.component, updated: this.updated }); // Notify parent
  }

  componentChanged(key, value) {
    // Does not notify parent until user clicks "Save". This allows undoing changes
    if (this.component[key] !== value) {
      this.component.isUpdated = true;
      this.updated[key] = value;
    }
  }

  getClientNames(component) {
    return component.clients.map(client => client.name);
  }

  configureClient(client?: IComponentClient) {
    //this.toggleEditComponent();
    this.router.navigate(['/components/' + this.component.id + '/client/' + (client ? client.id : '')]);
  }

  removeClient(client) {
    let index = this.updated.clients.findIndex(c => c === client);
    this.updated.clients.splice(index, 1);
    this.component.isUpdated = true;
  }

  configureAdapter(adapter?: IComponentAdapter) {
    this.router.navigate(['/components/' + this.component.id + '/adapter/']);
  }

  removeAdapter(adapter: IComponentAdapter) {
    this.updated.adapters = null;
    this.component.isUpdated = true;
  }

  saveComponent() {
    this.CommonComponent.save(this.updated);
    this.componentChange.emit({ component: this.component, updated: this.updated }); // Notify parent
  }
}
