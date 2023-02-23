import { Component, EventEmitter, Output } from '@angular/core';
import { LoginModel } from '../../models/loginModel-type';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Output() loginSubmitted = new EventEmitter<{ email: string, password: string }>();
  loginModel: LoginModel = {email:'',password: ''}

  onSubmit() {
    if (this.loginModel.email && this.loginModel.password) {
      this.loginSubmitted.emit(this.loginModel);
    }
  }
}
