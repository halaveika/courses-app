import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { RegistrationRoutingModule } from './registration/registration-routing.module';
import { CoursesRoutingModule } from './courses/courses-routing.module';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule,
    RegistrationRoutingModule,
    CoursesRoutingModule,
  ],
})
export class FeaturesModule { }
