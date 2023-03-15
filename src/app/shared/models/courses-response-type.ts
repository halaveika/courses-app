export interface CoursesResponse {
  successful: boolean;
  result: [{  title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
    id: string;}]
}
