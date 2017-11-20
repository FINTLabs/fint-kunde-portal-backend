import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessModule } from './views/access/access.module';
import { ComponentModule } from './views/components/component.module';
import { EventModule } from 'fint-shared-components';

import { HomeComponent } from './views/home/home.component';
import { ClientsModule } from './views/clients/clients.module';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', data: { label: 'Home' } },
  { path: '**', redirectTo: '' } // Anything else, go home
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    ClientsModule,
    ComponentModule,  // Including routes
    AccessModule,     // Including routes
    // EventModule.forRoot(), // Including routes for events
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
