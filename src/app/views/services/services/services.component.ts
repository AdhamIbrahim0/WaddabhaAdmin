import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule, TableModule, UtilitiesModule } from '@coreui/angular';
import { Service } from '../models/service';
import { ServicesService } from '../services-service/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [TableModule, UtilitiesModule, ButtonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit {
  services!: Service[];
  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.getServicesByStatus('Pending');
  }

  getServicesByStatus(status: string): void {
    this.servicesService.getServicesByStatus(status).subscribe({
      next: (res) => {
        this.services = res.data;
      },
    });
  }

  deleteService(id: string): void {
    const confirm = window.confirm(
      'Are you sure you want to delete this service?'
    );
    if (confirm) {
      this.servicesService.deleteService(id).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Service Deleted',
            text: 'You have successfully deleted this service',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          // this.loadCategories();
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            title: 'An error occurred',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        },
      });
    }
  }
}
