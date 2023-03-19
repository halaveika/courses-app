import { Author } from "./author-type";

export interface AuthorResponse {
  successful: boolean;
  result: Author[]
}
