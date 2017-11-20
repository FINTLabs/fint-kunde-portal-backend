import { Routes } from '@angular/router';

import { AccessComponent } from './access.component';
import { GrantComponent } from './grant/grant.component';

export const AccessRoutes: Routes = [
  {
    path: 'access', data: { label: 'Tilgang', icon: 'user' }, children: [
      { path: '', component: AccessComponent, pathMatch: 'full' },
      { path: 'grant', component: GrantComponent },
      { path: ':id', component: GrantComponent },
    ]
  }
];
