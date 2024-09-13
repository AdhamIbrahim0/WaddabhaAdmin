import { Routes } from '@angular/router';
import { UsersRouterComponent } from './users-router/users-router.component';

export const routes: Routes = [
  {
    path: '',
    component: UsersRouterComponent,
    data: {
      title: 'Users',
    },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./users/users.component').then((m) => m.UsersComponent),
        pathMatch: 'full',
        data: {
          title: 'Users List',
        },
      },
    ],
  },
];
