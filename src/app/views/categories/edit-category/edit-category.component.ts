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
      image: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('id', this.id);
      formData.append('name', this.form.get('name')?.value);
      formData.append('description', this.form.get('description')?.value);
      const imageFile = this.form.get('image')?.value;
      if (imageFile) {
        formData.append('image', imageFile);
      }
      this.editCategory(formData);
    } else {
      Swal.fire({
        title: 'Invalid Data',
        text: 'Please enter valid data',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (
      file.type == 'image/png' ||
      file.type == 'image/jpg' ||
      file.type == 'image/jpeg'
    ) {
      if (file) {
        this.form.patchValue({
          image: file,
        });
        this.form.get('image')?.updateValueAndValidity();
        const reader = new FileReader();
        // reader.onload = (e: any) => {
        //   this.imagePreview = e.target.result;
        // };
        reader.readAsDataURL(file);
      }
    } else {
      //  this.imageValidErr = "file extension must jpg or png and jpeg";
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

  editCategory(category: FormData): void {
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
