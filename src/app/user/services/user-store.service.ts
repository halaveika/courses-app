import { Injectable } from '@angular/core';
import { BehaviorSubject,throwError, catchError, forkJoin, map, Observable, switchMap, tap, of} from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthorService } from 'src/app/services/author.service';
import { AuthorResponse } from 'src/app/shared/models/author-response-type';
import { Author } from 'src/app/shared/models/author-type';
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

  constructor(private userService: UserService, private authorService: AuthorService) { }

  getUser(): void {
    this.userService.getUser().subscribe((user: UserResponseType) => {
      this.name$$.next(user.result.name);
      this.isAdmin$$.next(user.result.role === 'admin');
    });
  }

  getAuthors() {
    return this.authorService.getAll().pipe(
      catchError(error => {
        console.error('Error creating authors:', error);
        return throwError(error);
      }),
      map((response) => response.result),
    );
  }

  storeAuthors(previousAuthorsArray: Author[], currentAuthorsArray: Author[]): Observable<any> {
    const deleteObservables$ = previousAuthorsArray.map(e => this.authorService.deleteAuthor(e.id));
    const createObservables$ = currentAuthorsArray.map(e => this.authorService.createAuthor(e.name));
    const allObservables$ = [...deleteObservables$, ...createObservables$];

    if (allObservables$.length) {
      return forkJoin(
        allObservables$.map((observable$, i) =>
          observable$.pipe(
            delay(i * 500)
          )
        )
      ).pipe(
        catchError(error => {
          console.error('Error deleting/creating authors:', error);
          return throwError(error);
        }),
        map((responses: AuthorResponse[]) =>
          responses.filter(e => e.successful).map(e => e.result)
        ),
        tap(responses => console.log('storeAuthors', responses))
      );
    } else {
      return of([]);
    }
  }
}
