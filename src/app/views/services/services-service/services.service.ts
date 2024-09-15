import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private baseUrl = 'https://localhost:7116/api/admin/services';
  constructor(private http: HttpClient) {}

  getServicesByStatus(status: string): Observable<any> {
    const statusArray = ['Pending', 'Accepted', 'Rejected'];
    const statusIndex = statusArray.findIndex((e) => e === status);
    return this.http.get(this.baseUrl + `?status=${statusIndex}`);
  }

  getServiceById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + `/${id}`);
  }

  approveService(id: string): Observable<any> {
    return this.http.post(this.baseUrl + '/approve', { id });
  }

  rejectService(id: string, rejectionMessage: string): Observable<any> {
    return this.http.post(this.baseUrl + '/reject', { id, rejectionMessage });
  }

  deleteService(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + `/${id}`);
  }
}
