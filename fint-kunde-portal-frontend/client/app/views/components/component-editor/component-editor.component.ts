import { Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ICommonComponent } from 'app/api/ICommonComponent';
import { CommonComponentService } from '../common-component.service';
import { IComponentClient } from 'app/api/IComponentClient';
import { IComponentAdapter } from 'app/api/IComponentAdapter';

export interface ComponentUpdatedEvent {
  component: ICommonComponent;
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
    return [];
  }

  configureClient(client?: IComponentClient) {
    //this.toggleEditComponent();
    this.router.navigate(['/components/' + this.component.id + '/client/' + (client ? client.id : '')]);
  }

  removeClient(client) {
    // TODO: Remove client
  }

  configureAdapter(adapter?: IComponentAdapter) {
    this.router.navigate(['/components/' + this.component.id + '/adapter/']);
  }

  removeAdapter(adapter: IComponentAdapter) {
    // TODO: Remove adapter
  }

  saveComponent() {
    this.CommonComponent.save(this.updated);
    this.componentChange.emit({ component: this.component, updated: this.updated }); // Notify parent
  }
}
