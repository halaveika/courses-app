import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidatorDirective } from '../../../shared/directives/email-validator.directive';
import { LoginAction } from '../../models/loginAction-type';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  submitted = false;
  togglePassword = false;
  @Output() loginSubmitted = new EventEmitter<LoginAction>();
  @Output() login = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, new EmailValidatorDirective()]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    this.loginSubmitted.emit({action:'register', payload:this.registrationForm.value });
  }

  onLogin() {
    this.login.emit('login');
  }
}
