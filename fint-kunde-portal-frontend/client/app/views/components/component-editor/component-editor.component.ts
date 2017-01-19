import { Router, ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class ComponentEditorComponent {
  @Input('appComponentEditor') component: ICommonComponent;
  @Output() componentChange: EventEmitter<ICommonComponent> = new EventEmitter<ICommonComponent>();
  @Output() onEdit: EventEmitter<ComponentEditorComponent> = new EventEmitter<ComponentEditorComponent>();

  get componentUuid() { return this.updated.uuid; }
  get clientNames() { return [].concat(this.updated.clients).map(client => client ? client.note : '').join(', '); }

  /**
   * @return true if component is currently in edit mode
   */
  _active: boolean = false;
  get isActive() { return this._active; }
  set isActive(flag) {
    if (flag !== this._active) {
      delete this._componentCopy; // Reset component data clone
      this._active = flag;
    }
  }

  /**
   * Create a copy. Do not work on original item,
   * because we want to be able to rollback changes without reload.
   *
   * @return a copy of the given ICommonComponent
   */
  _componentCopy: ICommonComponent;
  get updated() {
    if (!this._componentCopy) {
      this._componentCopy = JSON.parse(JSON.stringify(this.component));
    }
    return this._componentCopy;
  }

  /**
   * @return true if editor data has changed
   */
  get isUpdated() {
    return JSON.stringify(this.component) != JSON.stringify(this.updated);
  }

  constructor(private router: Router, private CommonComponent: CommonComponentService, private route: ActivatedRoute) { }

  toggleEditComponent(flag?: boolean) {
    this.isActive = (flag != null ? flag : !this.isActive);
    this.onEdit.emit(this); // Notify parent
  }

  removeClient(client: IComponentClient) {
    this.updated.clients = this.updated.clients.filter(c => c.uuid !== client.uuid);
  }

  removeAdapter() {
    this.updated.adapter = null;
  }

  removeComponent() {
    this.CommonComponent.removeFromOrganisation(this.component)
      .subscribe(result => this.toggleEditComponent(false));
  }

  saveComponent() {
    if (this.isUpdated) {
      
    }
    this.CommonComponent.assignToOrganisation(this.updated);
    this.componentChange.emit(this.updated); // Notify parent
  }
}
