import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CommonComponentService } from './common-component.service';
import { ComponentUpdatedEvent } from './component-editor/component-editor.component';
import { ICommonComponent } from 'app/api/ICommonComponent';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {
  components: ICommonComponent[];
  currentEditor;
  currentEditorId: number;

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private CommonComponent: CommonComponentService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Komponenter | Fint');
    this.loadComponents();

    // Set editor from route parameter
    this.removeEditor();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.setEditor(CommonComponent.getById(params['id']));
      }
    });
  }

  ngOnInit() {
  }

  loadComponents() {
    this.CommonComponent.all().subscribe(result => {
      this.components = result._embedded.componentList;
    });
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
    this.loadComponents();
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
