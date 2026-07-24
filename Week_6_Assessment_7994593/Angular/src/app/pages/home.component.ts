import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllCourses } from '../store/course.selectors';
import * as CourseActions from '../store/course.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: false
})
export class HomeComponent implements OnInit, OnDestroy {
  // Task 1: Bindings
  portalName: string = 'Student Course Portal';
  isPortalActive: boolean = true;
  message: string = '';
  searchTerm: string = '';
  coursesCount: number = 0;

  private sub: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Dispatch action to load courses from API via Store
    this.store.dispatch(CourseActions.loadCourses());

    // Subscribe to selectAllCourses to update count in real time
    this.sub = this.store.select(selectAllCourses).subscribe((courses) => {
      this.coursesCount = courses.length;
    });

    // Task 2 Step 16: Log on component initialisation
    console.log('HomeComponent initialised — courses loaded');
  }

  // Event handler for Enroll Now button click
  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }

  // Helper method to toggle active state to test property binding
  togglePortalActiveState(): void {
    this.isPortalActive = !this.isPortalActive;
  }

  ngOnDestroy(): void {
    // Task 2 Step 17: Log to console when component is destroyed (navigated away)
    console.log('HomeComponent destroyed');

    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
