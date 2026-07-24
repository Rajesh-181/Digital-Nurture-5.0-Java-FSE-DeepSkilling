import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { Course } from '../models/course.model';
import { Store } from '@ngrx/store';
import { selectEnrolledCourseIds } from '../store/course.selectors';
import * as CourseActions from '../store/course.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
  standalone: false
})
export class CourseCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() course!: Course;
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded: boolean = false;
  enrolledCourseIds: number[] = [];
  
  // Subscription reference to clean up on destroy
  private sub: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Task 2 Step 100: Subscribe to enrolledIds to toggle button labels
    this.sub = this.store.select(selectEnrolledCourseIds).subscribe((ids) => {
      this.enrolledCourseIds = ids;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Log previous and current values of course input
    if (changes['course']) {
      const current = changes['course'].currentValue;
      const previous = changes['course'].previousValue;
      console.log('CourseCardComponent course changed:', { previous, current });
    }
  }

  // Toggles enrollment state by dispatching NgRx store actions
  onEnrollClick(event: MouseEvent): void {
    // Stop the event from bubbling up to the card click listener (which navigates to details)
    event.stopPropagation();

    if (this.isEnrolled()) {
      // Dispatch unenroll action
      this.store.dispatch(CourseActions.unenrollFromCourse({ courseId: this.course.id }));
    } else {
      // Dispatch enroll action
      this.store.dispatch(CourseActions.enrollInCourse({ courseId: this.course.id }));
    }

    // Emit event to notify parent component
    this.enrollRequested.emit(this.course.id);
  }

  isEnrolled(): boolean {
    return this.enrolledCourseIds.includes(this.course.id);
  }

  toggleDetails(event: MouseEvent): void {
    event.stopPropagation(); // Avoid triggering route navigation
    this.isExpanded = !this.isExpanded;
  }

  // Getter for classes to keep template clean
  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled(),
      'card--full': (this.course.credits ?? 0) >= 4,
      'expanded': this.isExpanded
    };
  }

  // Dynamic left border style based on gradeStatus
  get cardStyle() {
    let color = 'grey';
    if (this.course.gradeStatus === 'passed') {
      color = 'green';
    } else if (this.course.gradeStatus === 'failed') {
      color = 'red';
    }
    return {
      'border-left': `5px solid ${color}`
    };
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leak
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
