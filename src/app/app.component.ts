import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { mockedCourseList} from './shared/mocks/mockedCourseList';
import { Course } from 'src/app/shared/models/course-type';
import {LoginAction} from 'src/app/shared/models/loginAction-type'
import { LoginModel } from './shared/models/loginModel-type';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
import { AuthService } from './auth/services/auth.service';
import { UserStoreService } from './user/services/user-store.service';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string =  emptyInfo.title;
  text: string =  emptyInfo.text;
  user: string = '';
  isLogged: boolean = false;
  isRegistred: boolean = true;
  currentCourseId: string = '';
  modalConfig = {
    title: 'Confirmation',
    message: 'Are you sure you want to delete this course?',
    okButtonText: 'OK',
    cancelButtonText: 'CLOSE',
  }
  courses: Course[] = mockedCourseList;
  filteredCourses: Course[] = this.courses;
  private users:LoginModel[] = [];

  constructor(private coursesStoreService: CoursesStoreService, private router: Router, private authService: AuthService, private userStoreService: UserStoreService) {

  }

  ngOnInit() {
    this.coursesStoreService.getAll();
    this.authService.isAuthorized$.subscribe(
      (isAuthorized: boolean) => {
        this.isLogged = isAuthorized;
      }
    );
    this.userStoreService.name$.subscribe(
      (user: any) => {
        this.user = user;
      }
    );
  }

  setInfo(infoData:InfoData) {
    this.title = infoData.title;
    this.text = infoData.text;
  }

  onLoginViews(t:string) {
    console.log('logout',t);
  }

  onLogin() {
    this.router.navigate(['/login']);;
  }

  onLogout() {
    this.authService.logout();
    this.isLogged = false;
  }


  addCourse() {
    this.router.navigate(['/courses/add']);
  }
}
