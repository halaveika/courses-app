import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesComponent } from './courses.component';
import { CourseComponent } from '../course/course.component';
import { CourseInfoComponent } from '../course-info/course-info.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CoursesComponent, CourseComponent, CourseInfoComponent],
  imports: [CommonModule, CoursesRoutingModule,SharedModule],
  exports: [CoursesComponent, CourseComponent, CourseInfoComponent],
})
export class CoursesModule {}
