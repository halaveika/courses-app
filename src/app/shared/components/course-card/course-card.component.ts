import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() title: string = '';
  @Input() id?: string;
  @Input() description: string = '';
  @Input() creationDate: Date = new Date();
  @Input() duration: number = 0;
  @Input() authors: string[] = [];
}
