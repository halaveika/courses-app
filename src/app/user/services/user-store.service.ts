import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserResponseType } from 'src/app/shared/models/user-response-type';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private readonly name$$ = new BehaviorSubject<string | null>(null);
  private readonly isAdmin$$ = new BehaviorSubject<boolean>(false);

  readonly name$ = this.name$$.asObservable();
  readonly isAdmin$ = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) { }

  getUser(): void {
    this.userService.getUser().subscribe((user: UserResponseType) => {
      this.name$$.next(user.result.name);
      this.isAdmin$$.next(user.result.role === 'admin');
    });
  }
}
