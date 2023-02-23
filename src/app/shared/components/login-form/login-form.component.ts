import { Component, EventEmitter, Output } from '@angular/core';
import { LoginAction } from '../../models/loginAction-type';
import { LoginModel } from '../../models/loginModel-type';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Output() loginSubmitted = new EventEmitter<LoginAction>();
  @Output() register = new EventEmitter<string>();
  loginModel: LoginModel = {email:'',password: ''}

  onSubmit() {
    if (this.loginModel.email && this.loginModel.password) {
      console.log(this.loginModel);
      this.loginSubmitted.emit({action:'login', payload:this.loginModel });
    }
  }

  onRegister() {
    this.register.emit('register');
  }
}
