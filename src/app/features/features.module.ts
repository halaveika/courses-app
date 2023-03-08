import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login/login-routing.module';
import { RegistrationRoutingModule } from './registration/registration-routing.module';
import { CoursesModule } from './courses/courses.module';
import { CourseInfoComponent } from './course-info/course-info.component';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    RegistrationRoutingModule,
    CoursesModule,
  ],
  declarations: [
    CourseInfoComponent
  ],
})
export class FeaturesModule { }
