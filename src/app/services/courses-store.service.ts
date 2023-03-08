import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<any[]>([]);

  isLoading$ = this.isLoading$$.asObservable();
  courses$ = this.courses$$.asObservable();

  constructor(private coursesService: CoursesService) { }

  getAll(): void {
    this.isLoading$$.next(true);
    this.coursesService.getAll().subscribe(
      (courses) => {
        this.courses$$.next(courses.result);
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

  getCourse(id: any): void {
    this.isLoading$$.next(true);
    this.coursesService.getCourse(id).subscribe(
      (course) => {
        this.courses$$.next([course]);
        this.isLoading$$.next(false);
      },
      (error) => {
        console.log(error);
        this.isLoading$$.next(false);
      }
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
