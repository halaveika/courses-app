import { ActionReducerMap } from "@ngrx/store";
import { coursesReducer, CoursesState } from "./courses/courses.reducer";
import { CoursesEffects } from "./courses/courses.effects";

export interface AppState {
  courses: CoursesState;
}

export const reducers: ActionReducerMap<AppState> = {
  courses: coursesReducer
};

export const effects: any[] = [
  CoursesEffects
];
