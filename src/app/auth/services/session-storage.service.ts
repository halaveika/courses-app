import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string {
    return sessionStorage.getItem('token')!;
  }

  deleteToken(): void {
    sessionStorage.removeItem('token');
  }

}
