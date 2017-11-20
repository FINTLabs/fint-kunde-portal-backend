import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatProgressSpinnerModule
} from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { ClipboardModule } from 'ngx-clipboard';

import { LibSharedModule } from 'fint-shared-components';

import { ClientsComponent } from './clients.component';
import { ClientsRoutes } from './clients.routes';
import { AddClientComponent } from './add-client/add-client.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,

    AngularFontAwesomeModule,

    LibSharedModule,
    ClipboardModule,
    RouterModule.forChild([...ClientsRoutes])
  ],
  declarations: [ClientsComponent, AddClientComponent]
})
export class ClientsModule { }
