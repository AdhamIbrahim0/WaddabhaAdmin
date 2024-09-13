import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-categories-router',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './categories-router.component.html',
  styleUrl: './categories-router.component.scss',
})
export class CategoriesRouterComponent {}
