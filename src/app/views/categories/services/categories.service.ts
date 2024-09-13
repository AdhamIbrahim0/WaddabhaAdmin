import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private baseUrl = 'https://localhost:7116/api/admin/categories';
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getCategoryById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + `/${id}`);
  }

  addCategory(category: Category): Observable<any> {
    return this.http.post(this.baseUrl, category);
  }

  editCategory(category: Category): Observable<any> {
    return this.http.put(this.baseUrl + `/${category.id}`, category);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + `/${id}`);
  }
}
