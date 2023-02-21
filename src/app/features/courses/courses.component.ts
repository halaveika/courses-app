import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/shared/models/course-type';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  @Input() courses: Course[] = [];
  @Input() editable: boolean = true;
  @Output() courseAction = new EventEmitter<{action: string, courseId: string}>();

  onCourseAction(action: string, courseId: string) {
    this.courseAction.emit({ action, courseId });
  }
}
