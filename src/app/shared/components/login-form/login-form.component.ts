import { Component, EventEmitter, Output } from '@angular/core';
import { LoginAction } from '../../models/loginAction-type';
import { LoginModel } from '../../models/loginModel-type';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Output() loginSubmitted = new EventEmitter<LoginAction>();
  @Output() register = new EventEmitter<string>();
  loginModel: LoginModel = {email:'',password: ''}
  constructor(public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

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
