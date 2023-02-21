import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EmailValidatorDirective } from '../../directives/email-validator.directive';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Output() loginSubmitted = new EventEmitter<{ email: string, password: string }>();
  email: string = '';
  password: string = '';

  emailFormControl = new FormControl('', [
    Validators.required,
    new EmailValidatorDirective().validate
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  submitForm() {
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
      const submittedData = { email: this.emailFormControl.value!, password: this.passwordFormControl.value! };
      this.loginSubmitted.emit(submittedData);
      console.log(submittedData);
    } else {
      this.emailFormControl.markAsTouched();
      this.passwordFormControl.markAsTouched();
    }
  }
}
