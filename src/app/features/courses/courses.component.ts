import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable, tap, map, mergeMap  } from 'rxjs';
import { Course } from 'src/app/shared/models/course-type';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStoreService } from 'src/app/user/services/user-store.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';

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
  isLogged: boolean = false;
  filteredCourses: Course[] = [];
  showModal: boolean = false;
  deletedCourseId: string = '';

  constructor(private coursesStoreService: CoursesStoreService,private router: Router, private route: ActivatedRoute, private userStoreService: UserStoreService, private authService: AuthService, private coursesService: CoursesService ) {
  }

  ngOnInit() {
    console.log('CoursesComponent ngOnInit');
    this.coursesStoreService.getAll();
    this.getCourses();
    this.authService.isAuthorized$.subscribe(
      (isAuthorized: boolean) => {
        this.isLogged = isAuthorized;
      }
    );
  }

  onCourseAction({action, payload}:{action: string, payload: any}) {
    switch(action) {
      case 'delete':
        this.onShowModal();
        this.deletedCourseId = payload
        break;
      case 'edit':
        this.router.navigate(['edit', payload], { relativeTo: this.route });
        break;
      case 'show':
        this.router.navigate([payload], { relativeTo: this.route });
        break;
      case 'search':
        if(payload.title) {
        this.coursesStoreService.getFiltered(payload.title.toLocaleLowerCase());
        this.getCourses();
        } else {
          this.coursesStoreService.getAll();
          this.getCourses();
        }
        break;
    }
  }

  addCourse() {
    this.router.navigate(['/courses/add']);
  }

  getCourses() {
    this.courses$ = this.userStoreService.getAuthors().pipe(
      mergeMap((allAuthors) =>
        this.coursesStoreService.courses$.pipe(
          tap( (result) => console.log(result)),
          map((result) =>
            result.map((e) => {
              const authors = e.authors.map((a: string) => allAuthors.find((i) => i.id === a)?.name).filter(a => !!a) as string[];
              return { ...e, authors };
            })
          )
        )
      )
    );
  }

  onShowModal() {
    this.showModal = true;
  }

  onDeleteConfirmed(result: boolean) {
    if (result) {
      this.coursesStoreService.deleteCourse(this.deletedCourseId);
      this.deletedCourseId = ''
    }
    this.showModal = false;
    this.deletedCourseId = ''
  }

  onModalResult(result:boolean){
    this.onDeleteConfirmed(result);
  }

}
