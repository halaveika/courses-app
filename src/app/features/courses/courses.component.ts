import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/shared/models/course-type';
import { mockedCourseList} from './mock';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  @Input() courses: Course[] = mockedCourseList;
  @Input() editable: boolean = true;
  @Output() courseAction = new EventEmitter<{action: string, course: Course}>();

  onCourseAction(action: string, course: Course) {
    this.courseAction.emit({ action, course });
  }
}
