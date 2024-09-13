import { Component, OnInit } from '@angular/core';
import { ButtonModule, FormModule } from '@coreui/angular';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const category = this.form.value as Category;
      category.image = { imageUrl: 'test.jpg', publicId: '123' };
      this.addCategory(category);
    } else {
      Swal.fire({
        title: 'Invalid Data',
        text: 'Please enter valid data',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
    }
  }

  addCategory(category: Category): void {
    this.categoriesService.addCategory(category).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Category Added',
          text: 'Category added successfully.',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.router.navigateByUrl('/categories');
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
}
