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
  @Output() onLoginActions = new EventEmitter<LoginAction>();
  @Output() login = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, new EmailValidatorDirective()]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
    this.onLoginActions.emit({action:'registration', payload:this.registrationForm.value });
  }

  onLogin() {
    this.onLoginActions.emit({action:'login', payload: null });
  }

}
