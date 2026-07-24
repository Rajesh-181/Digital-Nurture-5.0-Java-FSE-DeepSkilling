import { createReducer, on } from '@ngrx/store';
import { Course } from '../models/course.model';
import * as CourseActions from './course.actions';

// Task 1 Step 94 & Task 2 Step 99: Course and Enrollment State Interface
export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
  enrolledCourseIds: number[];
}

export const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null,
  enrolledCourseIds: []
};

// Task 1 Step 94: Reducer implementation with actions handlers
export const courseReducer = createReducer(
  initialState,
  
  on(CourseActions.loadCourses, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(CourseActions.loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses: courses,
    loading: false,
    error: null
  })),
  
  on(CourseActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  // Task 2 Step 99: Reducers managing enrolledCourseIds array
  on(CourseActions.enrollInCourse, (state, { courseId }) => {
    if (state.enrolledCourseIds.includes(courseId)) {
      return state; // Avoid duplicate enrollment
    }
    return {
      ...state,
      enrolledCourseIds: [...state.enrolledCourseIds, courseId]
    };
  }),

  on(CourseActions.unenrollFromCourse, (state, { courseId }) => ({
    ...state,
    enrolledCourseIds: state.enrolledCourseIds.filter((id) => id !== courseId)
  }))
);
