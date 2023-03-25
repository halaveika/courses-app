import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoursesResponse } from '../shared/models/courses-response-type';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private baseUrl = 'http://localhost:4000/courses';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`)
  }

  createCourse(course: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, course);
  }

  editCourse(id: any, course: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, course);
  }

  getCourse(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  deleteCourse(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  searchCourses(keyword: string): Observable<CoursesResponse> {
    return this.http.get<CoursesResponse>(`${this.baseUrl}/filter?title=${keyword}`);
  }
}
