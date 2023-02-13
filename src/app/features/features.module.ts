import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [
    CoursesComponent,
    CourseComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [CoursesComponent,CoursesComponent]
})
export class FeaturesModule { }
