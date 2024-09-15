import { Component, OnInit } from '@angular/core';
import { Service } from '../models/service';
import { ServicesService } from '../services-service/services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule, CardModule } from '@coreui/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.scss',
})
export class ServiceDetailsComponent implements OnInit {
  service!: Service;
  id!: string;
  constructor(
    private servicesService: ServicesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadService();
  }

  approveService(): void {
    this.servicesService.approveService(this.id).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Service Approved',
          text: 'Service approved successfully.',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.loadService();
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          title: 'Error',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  rejectService(): void {
    let rejectionMessage;
    while (!rejectionMessage) {
      rejectionMessage = window.prompt('Please enter the rejection message');
    }
    this.servicesService.rejectService(this.id, rejectionMessage).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Service Rejected',
          text: 'Service rejected successfully.',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.loadService();
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          title: 'Error',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  loadService(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
      if (this.id) {
        this.servicesService.getServiceById(this.id).subscribe({
          next: (res) => {
            this.service = res.data;
          },
        });
      }
    });
  }
}
