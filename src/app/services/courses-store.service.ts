import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable,tap } from 'rxjs';
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

  getAll(): void {
    this.isLoading$$.next(true);
    this.coursesService.getAll().subscribe(
      (courses) => {
        const result = courses.result.map((course: Course) => {return {...course, creationDate: new Date(course.creationDate)}})
        this.courses$$.next(result);
        this.isLoading$$.next(false);
      },
      (error) => {
        console.log(error);
        this.isLoading$$.next(false);
      }
    );
  }

  createCourse(course: any): void {
    this.coursesService.createCourse(course).subscribe(
      () => {
        this.getAll();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editCourse(id: any, course: any): void {
    this.coursesService.editCourse(id, course).subscribe(
      () => {
        this.getAll();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCourse(id: string): Observable<Course> {
    this.isLoading$$.next(true);
    return this.coursesService.getCourse(id).pipe(
      map((course) => {
        this.isLoading$$.next(false);
        return {...course.result, creationDate: new Date(course.result.creationDate)}
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
