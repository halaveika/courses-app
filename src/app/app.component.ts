import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { mockedCourseList} from './shared/mocks/mockedCourseList';
import { Course } from 'src/app/shared/models/course-type';
import {LoginAction} from 'src/app/shared/models/loginAction-type'
import { LoginModel } from './shared/models/loginModel-type';
import { CoursesStoreService } from 'src/app/services/courses-store.service';

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
  showModal: boolean = false;
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

  constructor(private coursesStoreService: CoursesStoreService, private router: Router) {

  }

  ngOnInit() {
    this.coursesStoreService.getAll();
  }

  setInfo(infoData:InfoData) {
    this.title = infoData.title;
    this.text = infoData.text;
  }

  onShowModal() {
    this.showModal = true;
  }

  onDeleteConfirmed(result: boolean) {
    if (result) {
      this.courses = this.courses.filter(el => this.currentCourseId !== el.id)
      this.currentCourseId = '';
    }
    this.showModal = false;
  }

  onModalResult(result:boolean){
    this.onDeleteConfirmed(result)}

  // onLoginActions({action, payload: { name, email, password }}: LoginAction) {
  //   switch (action) {
  //     case 'login':
  //       {
  //         const user = this.users.filter(user => user.email === email && user.password === password);
  //         if(user.length) {
  //           this.user = user[0].name!;
  //           this.isLogged = true;
  //           this.isRegistred = true;
  //           this.setInfo(mockInfo);
  //         } else {
  //           this.isLogged = false;
  //           this.isRegistred = false;
  //         }
  //       }
  //       break;
  //     case 'register':
  //       {
  //         const user = this.users.filter(user => user.email === email)[0];
  //         if(user) {
  //           user.name = name;
  //           user.password = password;
  //           user.email = email;
  //         } else {
  //           this.users.push({ name, email, password });
  //         }
  //         this.isLogged = false;
  //         this.isRegistred = true;
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // }

  // onLoginViews(view:string) {
  //   switch (view) {
  //     case 'login':
  //       this.isRegistred = true;
  //       this.isLogged = false;
  //       console.log(view);
  //       break;
  //     case 'register':
  //       this.isLogged = false;
  //       this.isRegistred = false;
  //       console.log(view);
  //       break;
  //     case 'logout':
  //       this.isLogged = false;
  //       this.isRegistred = true;
  //       this.user = '';
  //       this.setInfo(emptyInfo)
  //       console.log(view);
  //       break;
  //     default:
  //       break;
  //   }
  // }

  onLoginViews(t:string) {
    console.log('logout',t);
  }

  addCourse() {
    this.router.navigate(['/courses/add']);
  }
}
