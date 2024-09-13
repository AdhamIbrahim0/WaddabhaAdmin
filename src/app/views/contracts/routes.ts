import { Routes } from '@angular/router';
import { ContractsRouterComponent } from './contracts-router/contracts-router.component';

export const routes: Routes = [
  {
    path: '',
    component: ContractsRouterComponent,
    data: {
      title: 'Contracts',
    },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./contracts/contracts.component').then(
            (m) => m.ContractsComponent
          ),
        pathMatch: 'full',
        data: {
          title: 'Contracts List',
        },
      },
    ],
  },
];
