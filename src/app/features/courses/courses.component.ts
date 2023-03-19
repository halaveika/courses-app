import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable, tap, map  } from 'rxjs';
import { Course } from 'src/app/shared/models/course-type';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStoreService } from 'src/app/user/services/user-store.service';
import { Author } from 'src/app/shared/models/author-type';

type InfoData = {
  title: string,
  text: string
}

const emptyInfo = {
  title:'Your List Is Empty',
  text:'Please use ’Add New Course’ button to add your first course'
}

const mockInfo = {
  title:'angular-course',
  text:''
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  title: string =  emptyInfo.title;
  text: string =  emptyInfo.text;
  courses$!:Observable<Course[]>;
  isLoading$ = this.coursesStoreService.isLoading$;
  @Input() editable: boolean = true;
  @Output() courseAction = new EventEmitter<{action: string, payload:{courseId: string}}>();
  currentCourseId: string = '';
  modalConfig = {
    title: 'Confirmation',
    message: 'Are you sure you want to delete this course?',
    okButtonText: 'OK',
    cancelButtonText: 'CLOSE',
  }
  // filteredCourses: Course[] = this.courses;

  constructor(private coursesStoreService: CoursesStoreService,private router: Router, private route: ActivatedRoute, private userStoreService: UserStoreService) {
  }

  ngOnInit() {
    console.log('CoursesComponent ngOnInit');
    let allAuthors:Author[] = [];
    this.userStoreService.getAuthors().subscribe((authors) => {
      allAuthors = authors;
      this.courses$ = this.coursesStoreService.courses$.pipe(
        tap((result) => console.log(result)),
        map((result) => result.map(e => {
          console.log('allAuthors',allAuthors);
          const authors = e.authors.map((a:string) => allAuthors.find(i => i.id === a )!.name);
          console.log('authors',authors);
          return {...e,authors}} )),
      );
    });
  }

  onCourseAction({action, payload}:{action: string, payload: any}) {
    switch(action) {
      case 'delete':
        this.coursesStoreService.deleteCourse(payload);
        break;
      case 'edit':
        this.router.navigate(['edit', payload], { relativeTo: this.route });
        break;
      case 'show':
        this.router.navigate([payload], { relativeTo: this.route });
        break;
      case 'search':
        console.log('seacrh',payload.title)
        // this.filteredCourses = this.courses.filter(course => course.title.toLocaleLowerCase().includes(payload.title.toLocaleLowerCase()))
        break;
    }
  }

  addCourse() {
    this.router.navigate(['/courses/add']);
  }

}
