import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CommonComponentService, IEditableComponent } from '../../api/common-component.service';
import { ComponentUpdatedEvent } from './component-editor/component-editor.component';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {
  components: IEditableComponent[];
  currentEditor;
  currentEditorId: number;

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private CommonComponent: CommonComponentService,
    private titleService: Title) {

    this.titleService.setTitle('Fint | Components');
    this.components = <IEditableComponent[]>CommonComponent.allConfigured();

    // Set editor from route parameter
    this.removeEditor();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.setEditor(CommonComponent.get(+params['id']));
      }
    });
  }

  ngOnInit() {
  }

  onEdit(event: ComponentUpdatedEvent) {
    if (!this.hasChanges()) {
      this.setEditor(event.component);
    }
  }

  private hasChanges(noNotify?: boolean) {
    if (this.currentEditor && this.currentEditor.isUpdated) {
      // Has changes.
      if (noNotify) { return true; }
      return !(confirm('Data er endret. Ønsker du å forkaste endringer?'));
    }
    return false;
  }

  onComponentSaved(event: ComponentUpdatedEvent) {
    this.removeEditor();
    this.components = <IEditableComponent[]>this.CommonComponent.allConfigured();
    this.redirect();
  }

  private setEditor(component, forceOpen?: boolean) {
    let newState = (forceOpen === true ? true : !component.isEdit);
    this.removeEditor();
    if (newState) {
      this.redirect(component.id);
      this.currentEditor = component; // Set editor
      component.isEdit = newState;    // Set state
    } else {
      this.redirect();
    }
  }

  private removeEditor() {
    if (this.currentEditor) {
      delete this.currentEditor.isUpdated;
      delete this.currentEditor.isEdit;
    }
    this.currentEditor = null;
    this.components.forEach(comp => delete comp.isEdit);  // Close all others
  }

  addComponent() {
    this.router.navigate(['/components/add']);
  }

  private redirect(componentId?: number) {
    if (this.currentEditorId != componentId) {
      this.location.go('/components/' + (!isNaN(componentId) ? componentId : ''));
      this.currentEditorId = componentId;
    }
  }
}
