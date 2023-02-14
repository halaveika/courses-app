import { Component, Input } from '@angular/core';

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
  title = emptyInfo.title;
  text = emptyInfo.text;
  user: string = '';
  isLogged: boolean = false;

  loginLogout() {
    if(this.isLogged) {
      this.isLogged = false;
      this.user = '';
      this.setInfo(emptyInfo)
      return;
    }
      this.isLogged = true;
      this.user = 'user';
      this.setInfo(mockInfo)
  }

  setInfo(infoData:InfoData) {
    this.title = infoData.title;
    this.text = infoData.text;
  }
}
