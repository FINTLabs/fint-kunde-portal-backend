import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input('appComponentEditor') component: ICommonComponent;
  @Output() componentChange: EventEmitter<ComponentUpdatedEvent> = new EventEmitter<ComponentUpdatedEvent>();
  @Output() onEdit: EventEmitter<ComponentEditorComponent> = new EventEmitter<ComponentEditorComponent>();

  get componentUuid() { return this.component.uuid; }

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
   * @return true if
   */
  get isUpdated() {
    return JSON.stringify(this.component) != JSON.stringify(this.updated);
  }

  constructor(private router: Router,
    private CommonComponent: CommonComponentService,
    private route: ActivatedRoute) { }

  ngOnInit() { }

  toggleEditComponent(flag?: boolean) {
    this.isActive = (flag != null ? flag : !this.isActive);
    this.onEdit.emit(this); // Notify parent
  }

  componentChanged(key, value) { }

  getClientNames(component) {
    return [].concat(component.clients).map(client => client ? client.note : '');
  }

  configureClient(client?: IComponentClient) {
    //this.toggleEditComponent();
    this.router.navigate(['./client/', (client ? client.uuid : '')], { relativeTo: this.route });
  }

  removeClient(client) {
    // TODO: Remove client
  }

  configureAdapter(adapter?: IComponentAdapter) {
    this.router.navigate(['./adapter/'], { relativeTo: this.route });
  }

  removeAdapter(adapter: IComponentAdapter) {
    // TODO: Remove adapter
  }

  saveComponent() {
    this.CommonComponent.save(this.updated);
    this.componentChange.emit({ component: this.component, updated: this.updated }); // Notify parent
  }
}
