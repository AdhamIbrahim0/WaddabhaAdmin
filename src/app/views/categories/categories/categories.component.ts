import { Component, DoCheck, OnInit } from '@angular/core';
import { TableModule, UtilitiesModule, ButtonModule } from '@coreui/angular';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TableModule, UtilitiesModule, ButtonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  categories!: Category[];
  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });
  }

  deleteCategory(id: string): void {
    const confirm = window.confirm(
      'Are you sure you want to delete this category?'
    );
    if (confirm) {
      this.categoriesService.deleteCategory(id).subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Category Deleted',
            text: 'You have successfully deleted this category',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.loadCategories();
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
