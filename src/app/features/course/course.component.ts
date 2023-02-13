import { Component, Input } from '@angular/core';;

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() creationDate: Date = new Date();
  @Input() duration: number = 0;
  @Input() authors: string[] = [];
  @Input() editable: boolean = true;
}
