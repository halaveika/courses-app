import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponseType } from 'src/app/shared/models/user-response-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:4000/users';

  constructor(private http: HttpClient) { }

  getUser(): Observable<UserResponseType> {
    const result = this.http.get<UserResponseType>(`${this.baseUrl}/me`);
    console.log('UserService response',result);
    return result
  }
}
