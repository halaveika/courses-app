import {LoginModel} from './loginModel-type';

export type LoginRequest = {
  successful: boolean,
  result: string,
  user: LoginModel
}
