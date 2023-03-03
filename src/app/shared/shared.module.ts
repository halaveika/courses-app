import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './components/modal/modal.component';
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  CourseCardComponent,
  LoginFormComponent,
  RegistrationFormComponent,
  CourseFormComponent,
} from "./components";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { CreationDatePipe } from './pipes/creation-date.pipe';
import { TogglePasswordDirective } from './directives/toggle-password.directive';

const components = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  CourseCardComponent,
  LoginFormComponent,
  RegistrationFormComponent,
  CourseFormComponent,
  ModalComponent,
  ConfirmModalComponent
];

@NgModule({
  declarations: [components, ConfirmModalComponent,EmailValidatorDirective,DurationPipe,CreationDatePipe,TogglePasswordDirective],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [components,EmailValidatorDirective,DurationPipe,CreationDatePipe,TogglePasswordDirective]
})
export class SharedModule { }
