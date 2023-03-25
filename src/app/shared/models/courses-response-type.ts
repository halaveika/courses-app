import { Course } from "./course-type";

export interface CoursesResponse {
  successful: boolean;
  result: Course[]
}
