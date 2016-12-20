import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AccessModule } from './views/access/access.module';
import { ComponentModule } from './views/components/component.module';
import { EventModule } from 'fint-shared-components';

import { HomeComponent } from './views/home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    MaterialModule,
    AccessModule,     // Including routes
    ComponentModule,  // Including routes
    EventModule,      // Including routes for events
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full', data: { label: 'Home' } },
      { path: '**', redirectTo: '' } // Anything else, go home
    ])
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
