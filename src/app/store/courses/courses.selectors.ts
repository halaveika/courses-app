import { createFeatureSelector, createSelector } from '@ngrx/store';
import { emptyCourse } from 'src/app/shared/mocks/mockedCourseList';
import { coursesFeatureKey, CoursesState } from './courses.reducer';

export const selectCoursesState = createFeatureSelector<CoursesState>(
  coursesFeatureKey
);

export const isAllCoursesLoadingSelector = createSelector(
  selectCoursesState,
  (state) => state.isAllCoursesLoading
);

export const isSearchingStateSelector = createSelector(
  selectCoursesState,
  (state) => state.isSearchState
);

export const isSingleCourseLoadingSelector = createSelector(
  selectCoursesState,
  (state) => state.isSingleCourseLoading
);

export const getCoursesSelector = createSelector(
  selectCoursesState,
  (state) => state.allCourses
);

export const getAllCoursesSelector = createSelector(
  getCoursesSelector,
  (courses) => courses
);

export const getCourseSelector = createSelector(
  selectCoursesState,
  (state) => state.course || emptyCourse
);

export const getErrorMessageSelector = createSelector(
  selectCoursesState,
  (state) => state.errorMessage || 'unexpected error'
);
