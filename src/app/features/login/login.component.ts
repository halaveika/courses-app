import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginAction } from 'src/app/shared/models/loginAction-type';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserStoreService } from 'src/app/user/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router,  private authService: AuthService, private userStoreService: UserStoreService) {

  }

  onLoginActions({action, payload}: LoginAction) {
    switch (action) {
      case 'login':
        this.authService.login(payload!).subscribe(
          result => {
            if (result.successful) {
              this.router.navigate(['/courses']);
              this.userStoreService.getUser();
            }
          });
        break;
      case 'registration':
        this.router.navigate(['/registration']);
        break;
      default:
        break;
    }
  }
}
