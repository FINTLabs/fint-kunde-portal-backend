import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FintDialogService } from 'fint-shared-components';

import { ICommonComponent } from 'app/api/ICommonComponent';
import { CommonComponentService } from '../common-component.service';
import { IComponentClient } from 'app/api/IComponentClient';

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

  constructor(private CommonComponent: CommonComponentService, private FintDialog: FintDialogService) { }

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
    this.FintDialog.confirmDelete().afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.CommonComponent.removeFromOrganisation(this.component)
          .subscribe(result => this.toggleEditComponent(false));
      }
    });
  }

  saveComponent() {
    if (this.isUpdated) {
      let promises = [];
      if (this.component.adapter != null && this.updated.adapter == null) { // Adapter is deleted.
        promises.push(this.CommonComponent.removeAdapter(this.componentUuid, this.component.adapter).toPromise());
      }

      if (this.component.clients.length > this.updated.clients.length) {
        // Clients are removed
        promises.push(this.component.clients
          .filter(c => this.updated.clients.findIndex(uc => uc.uuid === c.uuid) === -1)
          .map(c => this.CommonComponent.removeClient(this.componentUuid, c).toPromise())
        );
      }

      let me = this;
      Promise.all(promises).then(
        result => me.componentChange.emit(me.updated), // Notify parent
        error => delete me._componentCopy
      );
    }
  }
}
