import { Routes } from '@angular/router';

import { ClientsComponent } from './clients.component';
import { AddClientComponent } from './add-client/add-client.component';

export const ClientsRoutes: Routes = [
  {
    path: 'clients', data: { label: 'Klienter', icon: 'handshake-o' }, children: [
      { path: '', component: ClientsComponent, pathMatch: 'full' },
      { path: 'add', component: AddClientComponent },
      { path: ':id', component: AddClientComponent, pathMatch: 'full' }
    ]
  }
];
