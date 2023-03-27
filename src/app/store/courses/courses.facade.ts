import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from 'src/app/shared/models/course-type';
import { AppState } from '../index';
import {
  requestAllCourses,
  requestSingleCourse,
  requestFilteredCourses,
  requestEditCourse,
  requestCreateCourse,
  requestDeleteCourse,
} from './courses.actions';
import {
  isAllCoursesLoadingSelector,
  isSingleCourseLoadingSelector,
  isSearchingStateSelector,
  getAllCoursesSelector,
  getCourseSelector,
  getErrorMessageSelector,
} from './courses.selectors';

@Injectable({
  providedIn: 'root',
})
export class CoursesStateFacade {
  isAllCoursesLoading$: Observable<boolean>;
  isSingleCourseLoading$: Observable<boolean>;
  isSearchingState$: Observable<boolean>;
  courses$: Observable<Course[]>;
  allCourses$: Observable<Course[]>;
  course$: Observable<Course>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.isAllCoursesLoading$ = this.store.select(isAllCoursesLoadingSelector);
    this.isSingleCourseLoading$ = this.store.select(isSingleCourseLoadingSelector);
    this.isSearchingState$ = this.store.select(isSearchingStateSelector);
    this.courses$ = this.store.select(getAllCoursesSelector);
    this.allCourses$ = this.store.select(getAllCoursesSelector);
    this.course$ = this.store.select(getCourseSelector);
    this.errorMessage$ = this.store.select(getErrorMessageSelector);
  }

  getAllCourses(): void {
    this.store.dispatch(requestAllCourses());
  }

  getSingleCourse(id: string): void {
    this.store.dispatch(requestSingleCourse({ id }));
  }

  getFilteredCourses(keyword: string): void {
    this.store.dispatch(requestFilteredCourses({ keyword }));
  }

  editCourse(id: string, course: Partial<Course>): void {
    this.store.dispatch(requestEditCourse({ id, course }));
  }

  createCourse(course: Partial<Course>): void {
    this.store.dispatch(requestCreateCourse({ course }));
  }

  deleteCourse(id: string): void {
    this.store.dispatch(requestDeleteCourse({ id }));
  }
}
