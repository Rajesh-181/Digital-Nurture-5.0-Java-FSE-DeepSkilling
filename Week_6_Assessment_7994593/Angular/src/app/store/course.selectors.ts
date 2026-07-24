import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';

// Task 1 Step 95: selectCourseState feature selector
export const selectCourseState = createFeatureSelector<CourseState>('course');

// Task 1 Step 95: Course State Selectors
export const selectAllCourses = createSelector(
  selectCourseState,
  (state: CourseState) => state.courses
);

export const selectCoursesLoading = createSelector(
  selectCourseState,
  (state: CourseState) => state.loading
);

export const selectCoursesError = createSelector(
  selectCourseState,
  (state: CourseState) => state.error
);

// Task 2 Step 99: Enrollment Selectors
export const selectEnrolledCourseIds = createSelector(
  selectCourseState,
  (state: CourseState) => state.enrolledCourseIds
);

// Combines course list with enrolled IDs list to return full Course objects
export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledCourseIds,
  (courses, enrolledIds) => courses.filter((c) => enrolledIds.includes(c.id))
);
