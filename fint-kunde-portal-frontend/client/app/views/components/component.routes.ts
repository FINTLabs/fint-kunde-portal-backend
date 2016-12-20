import { Routes } from '@angular/router';

import { ComponentsComponent } from './components.component';
import { AddComponentComponent } from './add-component/add-component.component';
import { AddClientComponent } from './add-client/add-client.component';
import { AddAdapterComponent } from './add-adapter/add-adapter.component';

export const ComponentRoutes: Routes = [
  {
    path: 'components', data: { label: 'Komponenter', icon: 'puzzle-piece' }, children: [
      { path: '', component: ComponentsComponent, pathMatch: 'full' },
      { path: 'add', component: AddComponentComponent },
      {
        path: ':id', children: [
          { path: '', component: ComponentsComponent, pathMatch: 'full' },
          { path: 'client', component: AddClientComponent },
          { path: 'client/:clientId', component: AddClientComponent },
          { path: 'adapter', component: AddAdapterComponent },
        ]
      }
    ]
  }
];
