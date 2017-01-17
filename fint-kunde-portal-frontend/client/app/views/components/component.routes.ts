import { Routes } from '@angular/router';

import { ComponentsComponent } from './components.component';
import { AddComponentComponent } from './add-component/add-component.component';
import { AddClientComponent } from './add-client/add-client.component';
import { AddAdapterComponent } from './add-adapter/add-adapter.component';

export const ComponentRoutes: Routes = [
  {
    path: 'components', data: { label: 'Komponenter', icon: 'puzzle-piece' }, children: [
      { path: '', component: ComponentsComponent },
      { path: 'add', component: AddComponentComponent },
      { path: ':id', component: ComponentsComponent },
      { path: ':id/client', component: AddClientComponent },
      { path: ':id/client/:clientId', component: AddClientComponent },
      { path: ':id/adapter', component: AddAdapterComponent },
      { path: ':id/adapter/:adapterId', component: AddAdapterComponent }
    ]
  }
];
