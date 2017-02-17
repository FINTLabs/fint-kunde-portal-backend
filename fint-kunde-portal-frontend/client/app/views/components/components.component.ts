import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { CommonComponentService } from './common-component.service';
import { ComponentUpdatedEvent, ComponentEditorComponent } from './component-editor/component-editor.component';
import { ICommonComponent } from 'app/api/ICommonComponent';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit, AfterViewInit {
  components: ICommonComponent[];
  get hasComponents() { return this.components && this.components.length; }
  page: number;
  pages: number;
  pageSize: number;
  totalItems: number;

  isLoading: boolean = false;

  componentUuid: string;

  @ViewChildren(ComponentEditorComponent) editors: QueryList<ComponentEditorComponent>;

  // Currently active editor
  _currentEditor: ComponentEditorComponent;
  get currentEditor(): ComponentEditorComponent {
    if (this.editors) {
      return this.editors.find(editor => editor.isActive);
    }
    return null;
  }
  set currentEditor(e) {
    if (this._currentEditor != e) {
      this.editors.forEach(editor => {
        if (editor && editor !== e) { editor.isActive = false; }
      });
      if (e) {
        if (e && e.componentUuid !== this.componentUuid) {
          this.router.navigate(['/components', e.componentUuid]);
        }
      } else {
        this.router.navigate(['/components']);
      }
      this._currentEditor = e;
    }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private CommonComponent: CommonComponentService,
    private titleService: Title,
    private change: ChangeDetectorRef
  ) {
    this.loadComponents();
  }

  private loadComponents() {
    const me = this;
    this.isLoading = true;
    this.CommonComponent.all().subscribe(
      result => {
        me.page = result.page;
        me.pages = result.page_count;
        me.pageSize = result.page_size;
        me.totalItems = result.total_items;
        if (result._embedded.componentDtoList) {
          me.components = result._embedded.componentDtoList.filter(comp => comp.configured);
        }
        me.isLoading = false;
      },
      error => this.isLoading = false
    );
  }

  ngOnInit() {
    this.titleService.setTitle('Komponenter | Fint');
  }

  ngAfterViewInit() {
    // Set editor from route parameter
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.componentUuid = params['id'];
        // Set active editor
        if (!this.editors.toArray().length) {
          this.editors.changes.subscribe(editors => this.detectEditor());
        } else {
          this.detectEditor();
        }
      }
    });
  }

  /**
   * Editor set in url
   */
  private detectEditor() {
    let editor = this.editors.find(editor => editor.componentUuid == this.componentUuid);
    if (editor && !editor.isActive) {
      editor.toggleEditComponent();
      this.change.detectChanges();
    }
  }

  /**
   * Editor event emitted from ViewChild
   */
  onEdit(editor: ComponentEditorComponent) {
    if (editor.isActive) {
      this.currentEditor = editor;
    } else {
      this.currentEditor = null;
    }
  }

  /**
   * Component saved event emitted from ViewChild
   */
  onComponentSaved(updated: ICommonComponent) {
    this.currentEditor = null;
    this.loadComponents();
  }

  addComponent() {
    this.router.navigate(['/components/add']);
  }
}
