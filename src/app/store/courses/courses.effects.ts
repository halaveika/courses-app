import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import { CoursesService } from '../../services/courses.service';
import * as CoursesActions from './courses.actions';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
import { CoursesStateFacade } from './courses.facade';
import { Course } from 'src/app/shared/models/course-type';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private coursesStateFacade: CoursesStateFacade,
    private router: Router,
    private coursesStoreService: CoursesStoreService
  ) { }

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      mergeMap(() => this.coursesService.getAll()
        .pipe(
          map(({result}:{successful:boolean, result: Course[]}) => CoursesActions.requestAllCoursesSuccess({result})),
          catchError((error) => of(CoursesActions.requestAllCoursesFail(error)))
        )
      )
    )
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      mergeMap(({keyword}) => this.coursesService.searchCourses(keyword)
        .pipe(
          map(({result}:{successful:boolean, result: Course[]}) => CoursesActions.requestFilteredCoursesSuccess({ result }))
        )
      )
    )
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      mergeMap(({ id }) => this.coursesService.getCourse(id)
        .pipe(
          map(({result}:{successful:boolean, result: Course})  => CoursesActions.requestSingleCourseSuccess({ result })),
          catchError((error) => of(CoursesActions.requestSingleCourseFail(error)))
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      mergeMap(({ id }) => this.coursesService.deleteCourse(id)
        .pipe(
          map(() => CoursesActions.requestAllCourses()),
          catchError((error) => of(CoursesActions.requestDeleteCourseFail(error)))
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      mergeMap(({ id, course }) => this.coursesService.editCourse(id,course)
        .pipe(
          map(() => CoursesActions.requestEditCourseSuccess()),
          catchError((error) => of(CoursesActions.requestEditCourseFail(error)))
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      mergeMap(({ course }) => this.coursesService.createCourse(course)
        .pipe(
          map(() => CoursesActions.requestCreateCourseSuccess()),
          catchError((error) => of(CoursesActions.requestCreateCourseFail(error)))
        )
      )
    )
  );

  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CoursesActions.requestCreateCourseSuccess,
          CoursesActions.requestEditCourseSuccess,
          CoursesActions.requestSingleCourseFail
        ),
        tap(() => {
          this.router.navigate(['/courses']);
        })
      ),
    { dispatch: false }
  );
}
