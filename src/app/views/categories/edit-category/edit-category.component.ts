import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category';
import Swal from 'sweetalert2';
import { ButtonModule, FormModule } from '@coreui/angular';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [FormModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss',
})
export class EditCategoryComponent {
  form!: FormGroup;
  id!: string;

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCategory();
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
      category.id = this.id;
      category.image = { imageUrl: 'test.jpg', publicId: '123' };
      this.editCategory(category);
    } else {
      Swal.fire({
        title: 'Invalid Data',
        text: 'Please enter valid data',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
    }
  }

  loadCategory(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
      if (this.id) {
        this.categoriesService.getCategoryById(this.id).subscribe({
          next: (res) => {
            this.form.patchValue({
              name: res.data.name,
              description: res.data.description,
            });
          },
        });
      }
    });
  }

  editCategory(category: Category): void {
    this.categoriesService.editCategory(category).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Category Edited',
          text: 'Category edited successfully.',
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
