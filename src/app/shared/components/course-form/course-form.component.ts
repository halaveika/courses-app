import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Course } from '../../models/course-type';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
import { emptyCourse } from 'src/app/shared/mocks/mockedCourseList';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  course:Course = emptyCourse;
  courseId: string = '';
  courseForm!: FormGroup;
  submitted = false;
  authors: FormArray = this.fb.array([]);
  newAuthor: string ='';
  constructor(public fb: FormBuilder, public library: FaIconLibrary, private coursesStoreService: CoursesStoreService,private router: Router, private route: ActivatedRoute) {
    library.addIconPacks(fas);
  }

  get f() {
    return this.courseForm.controls;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
    });
    this.initForm();

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
          console.log(this.course);
          const authorForms = this.course.authors.map(author => this.fb.group({ name: author }));
          this.courseForm.setControl('authors', this.fb.array(authorForms));
          this.courseForm.patchValue({
            title: this.course.title,
            description: this.course.description,
            duration: this.course.duration
          });
          this.courseForm.get('newAuthor.name')!.valueChanges.subscribe((val) => {
            this.newAuthor = val;
          });
        }
      );
    }
  }

  onSubmit() {
    const authors = this.authors.value.map((e: { name: string }) => e.name);
    const {title, description, duration} = this.courseForm.value
    const courseData: Omit<Course,'id' | 'creationDate'> = {title,description,duration,authors};
    console.log(courseData);
    console.log('onSubmit');
    this.courseForm.reset();
    this.authors.clear();
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


