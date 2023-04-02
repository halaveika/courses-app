import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserStoreService } from './services/user-store.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userStoreService: UserStoreService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAdmin$ = this.userStoreService.isAdmin$;
    return isAdmin$.pipe(map(isAdmin => {
      if (isAdmin) {
        return true;
      }
      return this.router.parseUrl('/courses');
    }));
  }

}
