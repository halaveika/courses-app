import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private baseUrl = 'http://localhost:4000/authors';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  createAuthor(name: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, {name});
  }

  editAuthor(id: string, name: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, {name});
  }

  getAuthor(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  deleteAuthor(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
