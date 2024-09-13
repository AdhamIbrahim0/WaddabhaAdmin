import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-services-router',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './services-router.component.html',
  styleUrl: './services-router.component.scss',
})
export class ServicesRouterComponent {}
