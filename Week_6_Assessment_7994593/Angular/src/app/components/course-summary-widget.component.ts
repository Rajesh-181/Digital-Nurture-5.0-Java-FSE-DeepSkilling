import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';
import { Store } from '@ngrx/store';
import { selectAllCourses } from '../store/course.selectors';
import * as CourseActions from '../store/course.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-summary-widget',
  templateUrl: './course-summary-widget.component.html',
  styleUrl: './course-summary-widget.component.css',
  standalone: false
})
export class CourseSummaryWidgetComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  newCourseName: string = '';
  newCourseCode: string = '';

  private sub: Subscription = new Subscription();

  constructor(
    private courseService: CourseService,
    private store: Store
  ) {}

  ngOnInit(): void {
    // Select courses list from the NgRx Store
    this.sub = this.store.select(selectAllCourses).subscribe((list) => {
      this.courses = list;
    });
  }

  // Adds a course via HTTP POST and dispatches Store action to reload
  addQuickCourse(): void {
    if (!this.newCourseName || !this.newCourseCode) {
      alert('Please enter a course name and code.');
      return;
    }

    // Generate random temporary ID
    const nextId = Math.floor(Math.random() * 1000) + 300;
    const newCourse: Course = {
      id: nextId,
      name: this.newCourseName,
      code: this.newCourseCode,
      credits: 3,
      gradeStatus: 'pending'
    };

    // Call service HTTP POST
    this.courseService.createCourse(newCourse).subscribe({
      next: (savedCourse) => {
        console.log('Quick course created via POST:', savedCourse);
        
        // Dispatch NgRx action to load the fresh list of courses
        this.store.dispatch(CourseActions.loadCourses());

        // Clear form inputs
        this.newCourseName = '';
        this.newCourseCode = '';
      },
      error: (err) => {
        console.error('Failed to create quick course:', err);
        alert('Failed to add course. Make sure JSON-server is running.');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
