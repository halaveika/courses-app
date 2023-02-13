import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import {SharedModule} from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';



@NgModule({
  declarations: [
    CoursesComponent,
    CourseComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [CoursesComponent,CoursesComponent]
})
export class FeaturesModule { }
