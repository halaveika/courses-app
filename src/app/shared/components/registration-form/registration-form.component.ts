import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  @Output() login = new EventEmitter<string>();

  onLogin() {
    this.login.emit('login');
  }
}
