import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
import { emptyCourse } from 'src/app/shared/mocks/mockedCourseList';
import { Course } from 'src/app/shared/models/course-type';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  course:Course = emptyCourse;
  courseId: string = '';
  constructor(private coursesStoreService: CoursesStoreService,private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
    });
    this.coursesStoreService.getCourse(this.courseId).subscribe(
      result => {
        this.course = result;
        console.group('course-info')
        console.log('result',result);
        console.log('this.course',this.course);
        console.groupEnd();
      }
    );
  }

  clickBack() {
    this.router.navigate(['/courses']);
  }
}
