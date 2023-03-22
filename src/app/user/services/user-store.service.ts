import { Injectable } from '@angular/core';
import { BehaviorSubject,throwError, catchError, forkJoin, map, Observable, switchMap, tap, from, of, concatMap, toArray, concat} from 'rxjs';
import { delay, last } from 'rxjs/operators';
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

  deleteAuthors(authorsToDelete: Author[]): Observable<any[]> {
    const deleteObservables$ = authorsToDelete.map(e => this.authorService.deleteAuthor(e.id));
    return from(deleteObservables$).pipe(
      concatMap(obs => obs),
      toArray(),
      catchError(error => {
        console.error('Error deleting authors:', error);
        return throwError(error);
      })
    );
  }

  createAuthors(authorsToCreate: Author[]): Observable<Author[]> {
    const createObservables$ = authorsToCreate.map(e => this.authorService.createAuthor(e.name));
    return from(createObservables$).pipe(
      concatMap(obs => obs),
      toArray(),
      map((responses: AuthorResponse[]) =>
        responses
          .filter(e => e.successful)
          .map(e => e.result)
          .flat()
      ),
      catchError(error => {
        console.error('Error creating authors:', error);
        return throwError(error);
      })
    );
  }

  storeAuthors(previousAuthorsArray: Author[], currentAuthorsArray: Author[]): Observable<Author[]> {
    const deleteObservable$ = this.deleteAuthors(previousAuthorsArray);
    const createObservable$ = this.createAuthors(currentAuthorsArray);
    return deleteObservable$.pipe(
      switchMap(() => createObservable$)
    );
  }
}
