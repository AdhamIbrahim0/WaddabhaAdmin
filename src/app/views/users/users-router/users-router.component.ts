import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users-router',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './users-router.component.html',
  styleUrl: './users-router.component.scss',
})
export class UsersRouterComponent {}
