import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const token = cookieService.get('token');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `bearer ${token}`,
      },
    });
  }

  return next(req);
};
