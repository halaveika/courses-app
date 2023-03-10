import { LoginModel } from "./loginModel-type"


export type LoginAction = {
  action: string,
  payload: LoginModel
}
