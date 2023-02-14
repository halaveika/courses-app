import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  @Input() user: string = '';
  @Input() isLogged: boolean = false;

  loginLogout() {
    if(this.isLogged) {
      this.isLogged = false;
      this.user = '';
      return;
    }
      this.isLogged = true;
      this.user = 'user';
  }
}
