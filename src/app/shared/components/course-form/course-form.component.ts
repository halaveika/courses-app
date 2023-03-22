import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Observable,Subscription,tap, of, switchMap, EMPTY } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Course } from '../../models/course-type';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
import { emptyCourse } from 'src/app/shared/mocks/mockedCourseList';
import { AuthorService } from 'src/app/services/author.service';
import { UserStoreService } from 'src/app/user/services/user-store.service';
import { Author } from '../../models/author-type';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  allAuthors : Author[] = [];
  courseAuthors: Author[] =[];
  authorsSubscription!: Subscription;
  course:Course = emptyCourse;
  courseId: string = '';
  courseForm!: FormGroup;
  submitted = false;
  authors: FormArray = this.fb.array([]);
  newAuthor: string ='';
  constructor(public fb: FormBuilder, public library: FaIconLibrary, private coursesStoreService: CoursesStoreService,private router: Router, private route: ActivatedRoute, private authorService: AuthorService, private userStoreService: UserStoreService) {
    library.addIconPacks(fas);
  }

  get f() {
    return this.courseForm.controls;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
    });
    this.authorsSubscription = this.userStoreService.getAuthors().subscribe((authors) => {
      this.allAuthors = authors;
      console.log('ngOnInit this.allAuthors', this.allAuthors);
    });
    this.initForm();
  }

  ngOnDestroy() {
    this.authorsSubscription.unsubscribe();
  }

  initForm() {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      newAuthor: this.fb.group({
        name: ['', [Validators.minLength(6)]]
      }),
      authors: this.fb.array([])
    });

    if (this.courseId) {
      this.coursesStoreService.getCourse(this.courseId).subscribe(
        result => {
          this.course = result;
          console.log('this.course.authors',this.course.authors);
          console.log('this.allAuthors',this.allAuthors);
          this.courseAuthors = this.course.authors.map(id => this.allAuthors.find( a => a.id === id)) as Author[];
          console.log('this.courseAuthors',this.courseAuthors);
          const authorForms = this.courseAuthors.map(author => this.fb.group({ name: [author.name] }));
          console.log('authorForms',authorForms);
          authorForms.forEach(e =>  this.authors.push(this.fb.group({
            name: [e.value.name,]
          })));
          this.courseForm.setControl('authors', this.fb.array(authorForms));
          this.courseForm.patchValue({
            title: this.course.title,
            description: this.course.description,
            duration: this.course.duration,
          });
        }
      );
    }
    this.courseForm.get('newAuthor.name')!.valueChanges.subscribe((val) => {
      this.newAuthor = val;
    });
  }

  onSubmit() {
    const { title, description, duration } = this.courseForm.value;
    const courseData: Omit<Course, 'id' | 'creationDate'> = { title, description, duration, authors: [] };

    if (this.courseId) {
      this.userStoreService.storeAuthors(this.courseAuthors, this.authors.value)
        .pipe(
          switchMap((result:Author[]) => {
            if (result) {
              console.log('onSubmit added authors',result);
              courseData.authors = result.map((e: { id: string }) => e.id);
              return this.coursesStoreService.editCourse(this.courseId, courseData);
            }
            return of(EMPTY);
          }),
          tap((result) => {
            console.log('onSubmit courses',result);
            this.courseForm.reset();
            this.authors.clear();
            this.router.navigate(['/courses']);
          } )
        ).subscribe();
    } else {
      this.userStoreService.storeAuthors(this.courseAuthors, this.authors.value)
        .pipe(
          switchMap((result: Author[]) => {
            if (result) {
              courseData.authors = result.map((e: { id: string }) => e.id);
              return this.coursesStoreService.createCourse(courseData);
            }
            return of(EMPTY);
          })
        )
        .subscribe(() => {
          this.courseForm.reset();
          this.authors.clear();
          this.router.navigate(['/courses']);
        }, error => console.error('Error creating course:', error));
    }
  }

  addAuthor() {
    this.authors.push(this.fb.group({
      name: [this.newAuthor,[Validators.pattern(/^[a-zA-Z0-9]+$/)]]
    }));
    this.courseForm.get('newAuthor.name')!.reset();
  }

  removeAuthor(index:number) {
    this.authors.removeAt(index);
  }

  isAuthorButtonDisabled(name: string): boolean {
    return this.authors.controls.some((control) => control.value.name.toLowerCase() === name.toLowerCase());
  }

  clickBack() {
    this.router.navigate(['/courses']);
  }
}


