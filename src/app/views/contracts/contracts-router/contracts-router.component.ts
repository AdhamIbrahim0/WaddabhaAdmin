import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-contracts-router',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './contracts-router.component.html',
  styleUrl: './contracts-router.component.scss',
})
export class ContractsRouterComponent {}
