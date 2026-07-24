import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEnrolledCourses } from '../store/course.selectors';
import * as CourseActions from '../store/course.actions';
import { Course } from '../models/course.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css',
  standalone: false
})
export class StudentProfileComponent implements OnInit {
  enrolledCourses$: Observable<Course[]> | undefined;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Task 2 Step 66 & 99: Select enrolled course objects array using derived store selector
    this.enrolledCourses$ = this.store.select(selectEnrolledCourses);
  }

  // Toggles unenroll action on store dispatching
  unenroll(courseId: number): void {
    this.store.dispatch(CourseActions.unenrollFromCourse({ courseId }));
  }
}
