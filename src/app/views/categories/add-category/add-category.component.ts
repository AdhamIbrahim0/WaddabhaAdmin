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
      image: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('name', this.form.get('name')?.value);
      formData.append('description', this.form.get('description')?.value);
      const imageFile = this.form.get('image')?.value;
      if (imageFile) {
        formData.append('image', imageFile);
      }
      this.addCategory(formData);
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

  addCategory(formData: FormData): void {
    this.categoriesService.addCategory(formData).subscribe({
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
