import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionStorageService } from './session-storage.service';
import { LoginModel } from 'src/app/shared/models/loginModel-type';
import { LoginRequest } from 'src/app/shared/models/login-request-type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:4000';
  isAuthorized$$ = new BehaviorSubject<boolean>(false);
  isAuthorized$ = this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) { }

  login({ email, password }: LoginModel): Observable<any> {
    return this.http.post<LoginRequest>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap(response => {
        const token = response.result;
        this.sessionStorageService.setToken(token);
        this.isAuthorized$$.next(true);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/logout`, {}).pipe(
      tap(() => {
        this.sessionStorageService.deleteToken();
        this.isAuthorized$$.next(false);
      })
    );
  }

  register({ name, email, password }: LoginModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { name, email, password });
  }

}
