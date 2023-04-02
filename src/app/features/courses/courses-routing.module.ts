import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseFormComponent } from 'src/app/shared/components';
import { CourseInfoComponent } from '../course-info/course-info.component';
import { AdminGuard } from 'src/app/user/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
  },
  {
    path: 'add',
    component: CourseFormComponent,
    canActivate: [AdminGuard],
  },
  {
    path: ':id',
    component: CourseInfoComponent,
  },
  {
    path: 'edit/:id',
    component: CourseFormComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
