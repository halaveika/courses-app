import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { SessionStorageService } from '../services/session-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.sessionStorageService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.authService.logout().subscribe(() => {
            this.router.navigateByUrl('/login');
          });
        }
        return throwError(error);
      })
    );
  }

}
