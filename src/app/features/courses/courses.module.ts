import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesComponent } from './courses.component';
import { CourseComponent } from '../course/course.component';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [CoursesComponent, CourseComponent],
  imports: [CommonModule, CoursesRoutingModule],
  exports: [CoursesComponent, CourseComponent],
})
export class CoursesModule {}
