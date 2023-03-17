import { CoursesResponseResult } from "./courses-response-result-type";

export interface CoursesResponse {
  successful: boolean;
  result: CoursesResponseResult[]
}
