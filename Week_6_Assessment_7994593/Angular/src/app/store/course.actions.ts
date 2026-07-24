import { createAction, props } from '@ngrx/store';
import { Course } from '../models/course.model';

// Task 1 Step 93: Course Actions
export const loadCourses = createAction(
  '[Course] Load Courses'
);

export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: string }>()
);

// Task 2 Step 99: Enrollment Actions
export const enrollInCourse = createAction(
  '[Course] Enroll In Course',
  props<{ courseId: number }>()
);

export const unenrollFromCourse = createAction(
  '[Course] Unenroll From Course',
  props<{ courseId: number }>()
);
