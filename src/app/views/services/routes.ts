import { Routes } from '@angular/router';
import { ServicesRouterComponent } from './services-router/services-router.component';

export const routes: Routes = [
  {
    path: '',
    component: ServicesRouterComponent,
    data: {
      title: 'Services',
    },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./services/services.component').then(
            (m) => m.ServicesComponent
          ),
        pathMatch: 'full',
        data: {
          title: 'Services List',
        },
      },
    ],
  },
];
