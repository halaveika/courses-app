import { Component, Input, Output, EventEmitter } from '@angular/core';;

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() creationDate: string = '';
  @Input() duration: number = 0;
  @Input() authors: string[] = [];
  @Input() editable: boolean = true;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() show = new EventEmitter<string>();

  onDeleteClicked() {
    this.delete.emit();
  }

  onEditClicked() {
    this.edit.emit();
  }

  onShowClicked() {
    this.show.emit();
  }
}
