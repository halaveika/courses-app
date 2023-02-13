import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() creationDate: Date = new Date();
  @Input() duration: number = 0;
  @Input() authors: string[] = [];
  @Input() editable: boolean = true;

  formatDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')} hours`;
  }
}
