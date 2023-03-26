import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/shared/models/course-type';

export const requestAllCourses = createAction('[Courses] Request All');
export const requestAllCoursesSuccess = createAction('[Courses] Request All Success', props<{ courses: Course[] }>());
export const requestAllCoursesFail = createAction('[Courses] Request All Fail', props<{ error: any }>());

export const requestSingleCourse = createAction('[Courses] Request Single', props<{ id: string }>());
export const requestSingleCourseSuccess = createAction('[Courses] Request Single Success', props<{ course: Course }>());
export const requestSingleCourseFail = createAction('[Courses] Request Single Fail', props<{ error: any }>());

export const requestFilteredCourses = createAction('[Courses] Request Filtered', props<{ keyword: string }>());
export const requestFilteredCoursesSuccess = createAction('[Courses] Request Filtered Success', props<{ courses: Course[] }>());
export const requestFilteredCoursesFail = createAction('[Courses] Request Filtered Fail', props<{ error: any }>());

export const requestDeleteCourse = createAction('[Courses] Request Delete', props<{ id: string }>());
export const requestDeleteCourseSuccess = createAction('[Courses] Request Delete Success');
export const requestDeleteCourseFail = createAction('[Courses] Request Delete Fail', props<{ error: any }>());

export const requestEditCourse = createAction('[Courses] Request Edit', props<{ id: string, course: Partial<Course>}>());
export const requestEditCourseSuccess = createAction('[Courses] Request Edit Success');
export const requestEditCourseFail = createAction('[Courses] Request Edit Fail', props<{ error: any }>());

export const requestCreateCourse = createAction('[Courses] Request Create', props<{ course: Partial<Course> }>());
export const requestCreateCourseSuccess = createAction('[Courses] Request Create Success');
export const requestCreateCourseFail = createAction('[Courses] Request Create Fail', props<{ error: any }>());
