import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Course } from '../../models/course-type';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  submitted = false;
  authors: FormArray = this.fb.array([]);
  newAuthor: string ='';
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  get f() {
    return this.courseForm.controls;
  }

  ngOnInit() {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      duration: [0, [Validators.required, Validators.min(0)]],
      authors: this.fb.array([]),
      newAuthor: this.fb.group({
        name: ['', [Validators.pattern(/^[a-zA-Z0-9]+$/),]]
      })
    });

    this.courseForm!.get('newAuthor.name')!.valueChanges.subscribe((val) => {
      this.newAuthor = val;
    });

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
}


