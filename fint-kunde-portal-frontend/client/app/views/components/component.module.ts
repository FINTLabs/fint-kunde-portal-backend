// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatButtonModule, MatListModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { ClipboardModule } from 'ngx-clipboard';

import { LibSharedModule } from 'fint-shared-components';
import { ComponentRoutes } from './component.routes';

// Components
import { ComponentsComponent } from './components.component';
import { ComponentEditorComponent } from './component-editor/component-editor.component';
import { AddComponentComponent } from './add-component/add-component.component';
import { AddClientComponent } from './add-client/add-client.component';
import { AddAdapterComponent } from './add-adapter/add-adapter.component';

@NgModule({
  declarations: [
    ComponentsComponent,
    ComponentEditorComponent,
    AddClientComponent,
    AddComponentComponent,
    AddAdapterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,

    AngularFontAwesomeModule,

    LibSharedModule,
    ClipboardModule,
    RouterModule.forChild([...ComponentRoutes])
  ]
})
export class ComponentModule { }
