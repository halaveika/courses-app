import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable,tap } from 'rxjs';
import { CoursesResponse } from '../shared/models/courses-response-type';
import { Course } from '../shared/models/course-type';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<Course[]>([]);

  isLoading$ = this.isLoading$$.asObservable();
  courses$ = this.courses$$.asObservable();

  constructor(private coursesService: CoursesService) { }

  private formatDate(date:string) {
    const parts = date.split('/');
    const isoDateString = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}T00:00:00.000Z`;
    return new Date(isoDateString)
  }

  getAll(): void {
    this.isLoading$$.next(true);
    this.coursesService.getAll().subscribe(
      (courses:CoursesResponse) => {
        const result = courses.result.map((course) => {return {...course, creationDate: this.formatDate(course.creationDate)}})
        this.courses$$.next(result);
        this.isLoading$$.next(false);
      },
      (error) => {
        console.log(error);
        this.isLoading$$.next(false);
      }
    );
  }

  createCourse(course: Omit<Course,'id' | 'creationDate'>): any {
    return this.coursesService.createCourse(course)
  }

  editCourse(id: string, course: Omit<Course,'id' | 'creationDate'>):  Observable<any> {
    return this.coursesService.editCourse(id, course)
  }

  getCourse(id: string): Observable<Course> {
    this.isLoading$$.next(true);
    return this.coursesService.getCourse(id).pipe(
      map((course) => {
        this.isLoading$$.next(false);
        return {...course.result, creationDate: this.formatDate(course.result.creationDate)}
      })
    );
  }

  deleteCourse(id: any): void {
    this.coursesService.deleteCourse(id).subscribe(
      () => {
        this.getAll();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
