import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from '../models/course.model';
import { Store } from '@ngrx/store';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../store/course.selectors';
import * as CourseActions from '../store/course.actions';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
  standalone: false
})
export class CourseListComponent implements OnInit, OnDestroy {
  courses$: Observable<Course[]> | undefined;
  isLoading$: Observable<boolean> | undefined;
  errorMessage$: Observable<string | null> | undefined;
  
  selectedCourseId: number | null = null;
  searchTerm: string = '';
  
  private routeSub: Subscription = new Subscription();

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Task 1 Step 96: Dispatch NgRx action to load courses from Store
    this.store.dispatch(CourseActions.loadCourses());

    // Task 1 Step 96: Select course list, loading state, and error message from selectors
    this.isLoading$ = this.store.select(selectCoursesLoading);
    this.errorMessage$ = this.store.select(selectCoursesError);

    // Task 1 Step 71: Read back query parameter for search
    // We subscribe so that when search parameter updates, our component updates in real time.
    this.routeSub = this.route.queryParamMap.subscribe((params) => {
      this.searchTerm = params.get('search') || '';
    });

    // We select courses and pipe to map to apply the client-side search query filtering
    this.courses$ = this.store.select(selectAllCourses).pipe(
      map((courses) => {
        if (!this.searchTerm) {
          return courses;
        }
        return courses.filter(
          (c) =>
            c.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            c.code.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      })
    );
  }

  // Method triggered when a course card emits enrollRequested
  onEnroll(courseId: number): void {
    console.log('Enroll click propagated. Course ID:', courseId);
    this.selectedCourseId = courseId;
  }

  // Task 1 Step 70: Navigate to details /courses/:id when a card is clicked
  goToDetails(course: Course): void {
    this.router.navigate(['/courses', course.id]);
  }

  // Task 1 Step 71: Update URL query parameters on search input change
  onSearchChange(): void {
    this.router.navigate(['/courses'], {
      queryParams: { search: this.searchTerm || null },
      queryParamsHandling: 'merge'
    });
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
