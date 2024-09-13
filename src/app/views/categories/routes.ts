import { Routes } from '@angular/router';
import { CategoriesRouterComponent } from './categories-router/categories-router.component';

export const routes: Routes = [
  {
    path: '',
    component: CategoriesRouterComponent,
    data: {
      title: 'Categories',
    },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
        pathMatch: 'full',
        data: {
          title: 'Categories List',
        },
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./add-category/add-category.component').then(
            (m) => m.AddCategoryComponent
          ),
        data: {
          title: 'Add Category',
        },
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./edit-category/edit-category.component').then(
            (m) => m.EditCategoryComponent
          ),
        data: {
          title: 'Edit Category',
        },
      },
    ],
  },
];
