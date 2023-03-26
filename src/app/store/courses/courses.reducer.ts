import { createReducer, on } from '@ngrx/store';
import { Course } from 'src/app/shared/models/course-type';
import * as CoursesActions from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
  allCourses: Course[];
  course: Course | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string | null;
}

export const initialState: CoursesState = {
  allCourses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: null,
};

export const coursesReducer = createReducer(
  initialState,
  on(CoursesActions.requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: null,
  })),
  on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    errorMessage: null,
  })),
  on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
    ...state,
    allCourses: [],
    isAllCoursesLoading: false,
    errorMessage: error.message,
  })),
  on(CoursesActions.requestSingleCourse, (state) => ({
    ...state,
    course: null,
    isSingleCourseLoading: true,
    errorMessage: null,
  })),
  on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course,
    isSingleCourseLoading: false,
    errorMessage: null,
  })),
  on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
    ...state,
    course: null,
    isSingleCourseLoading: false,
    errorMessage: error.message,
  })),
  on(CoursesActions.requestFilteredCourses, (state) => ({
    ...state,
    allCourses: [],
    isAllCoursesLoading: true,
    isSearchState: true,
    errorMessage: null,
  })),
  on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    errorMessage: null,
  })),
  on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    allCourses: [],
    isAllCoursesLoading: false,
    errorMessage: error.message,
  })),
  on(CoursesActions.requestDeleteCourse, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(CoursesActions.requestDeleteCourseSuccess, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error.message,
  })),
  on(CoursesActions.requestEditCourse, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(CoursesActions.requestEditCourseSuccess, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error.message,
  })),
  on(CoursesActions.requestCreateCourse, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(CoursesActions.requestCreateCourseSuccess, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(CoursesActions.requestCreateCourseFail
    , (state, { error }) => ({
      ...state,
      errorMessage: error.message,
  }))
);
