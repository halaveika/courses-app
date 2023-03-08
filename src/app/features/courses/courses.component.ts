import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Course } from 'src/app/shared/models/course-type';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses$!:any; // define courses$ as an observable
  isLoading$ = this.coursesStoreService.isLoading$;
  @Input() editable: boolean = true;
  @Output() courseAction = new EventEmitter<{action: string, payload:{courseId: string}}>();

  constructor(private coursesStoreService: CoursesStoreService,private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.courses$ = this.coursesStoreService.courses$.pipe(
      tap((result) => console.log(result))
    );
  }

  onCourseAction(action: string, courseId: string) {
    switch(action) {
      case 'delete':
        this.coursesStoreService.deleteCourse(courseId);
        break;
      case 'edit':
        this.router.navigate(['edit', courseId], { relativeTo: this.route });
        break;
      case 'show':
      default:
        this.router.navigate([courseId], { relativeTo: this.route });
        break;
    }
  }

}
