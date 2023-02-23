import { Component, Input } from '@angular/core';
import { mockedCourseList} from './shared/mocks/mockedCourseList';
import { Course } from 'src/app/shared/models/course-type';

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
export class AppComponent {
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

  onCourseActionExecut({action, courseId}:{action: string, courseId: string}) {
    switch (action) {
      case 'show':
        console.log('show',courseId)
        break;
      case 'delete':
        this.onShowModal();
        this.currentCourseId = courseId;
        break;
      case 'edit':
        console.log('edit',courseId)
        break;
      default:
        break;
    }
  }

  onLoginActions(submittedData: {email: string, password: string}) {
    console.log('onLoginSubmitted',submittedData)
    this.isLogged = true;
    this.isRegistred = true;
    this.user = submittedData.email;
    this.setInfo(mockInfo);
  }

  onLoginViews(view:string) {
    switch (view) {
      case 'login':
        this.isRegistred = true;
        this.isLogged = false;
        console.log(view);
        break;
      case 'register':
        this.isLogged = false;
        this.isRegistred = false;
        console.log(view);
        break;
      case 'logout':
        this.isLogged = false;
        this.isRegistred = true;
        this.user = '';
        this.setInfo(emptyInfo)
        console.log(view);
        break;
      default:
        break;
    }
  }
}
