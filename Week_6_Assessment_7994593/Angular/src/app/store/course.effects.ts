import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CourseService } from '../services/course.service';
import * as CourseActions from './course.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CourseEffects {
  // Using Angular's inject() function is the modern standard for resolving dependencies in Angular 19+
  // and avoids constructor parameter type reflection issues in custom build setups.
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  constructor() {}

  // Task 2 Step 97: loadCourses$ effect
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map((courses) => CourseActions.loadCoursesSuccess({ courses })),
          catchError((error) =>
            of(CourseActions.loadCoursesFailure({ error: error.message || 'Unknown error occurred.' }))
          )
        )
      )
    )
  );
}
