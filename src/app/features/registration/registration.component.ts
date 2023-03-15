import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoginAction } from 'src/app/shared/models/loginAction-type';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  constructor(private router: Router, private authService: AuthService) {

  }

  onLoginActions({action, payload}: LoginAction) {
    switch (action) {
      case 'login':
        this.router.navigate(['/login']);
        break;
      case 'registration':
        this.authService.register(payload!).subscribe(
          result => {
            console.log(result);
            if (result.successful) {
              this.router.navigate(['/login']);
            }
          });
        break;
      default:
        break;
    }
  }

}
