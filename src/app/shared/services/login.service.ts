import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private urlPath = 'https://localhost:7116/api/admin/auth';
  loggedIn: boolean = false;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(obj: any): Observable<any> {
    return this.http.post(`${this.urlPath}/login`, obj);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  setToken(token: string): void {
    this.loggedIn = true;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // Set expiry date to 7 days
    this.cookieService.set('token', token, expiryDate);
  }

  getToken(): string | null {
    return this.cookieService.get('token') || null;
  }

  logout(): void {
    this.cookieService.delete('token');
    this.loggedIn = false;
  }
}
