import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl: string = 'http://localhost:3000/courses';
  
  // Local cache for widgets requiring synchronous data access
  private localCache: Course[] = [];

  constructor(private http: HttpClient) { }

  // Task 1 Step 79: getCourses returning Observable
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      // Task 2 Step 86: retry strategy (retries twice before failure)
      retry(2),

      // Task 2 Step 85: tap operator for logging side effects
      /*
        Explanation comment: The tap operator is preferred for side-effects (like logging, 
        updating a local cache, or modifying a loading indicator) because it does not alter 
        the data stream. Map should only be used to transform values. Using map for side-effects 
        violates the principles of pure functions and functional reactive programming.
      */
      tap((courses) => {
        console.log('Courses loaded from API (tap side-effect):', courses.length);
        this.localCache = courses; // update local cache
      }),

      // Task 2 Step 83: map operator filtering courses with credits > 0
      map((courses) => courses.filter((c) => c.credits !== null && c.credits > 0)),

      // Task 2 Step 84: error handling using catchError
      catchError((err) => {
        console.error('Error in CourseService.getCourses():', err);
        return throwError(() => new Error('Failed to load courses. Please try again later.'));
      })
    );
  }

  // Task 1 Step 79: getCourseById returning Observable
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      retry(2),
      catchError((err) => {
        console.error(`Error in getCourseById for ID ${id}:`, err);
        return throwError(() => new Error(`Failed to load details for course ID: ${id}`));
      })
    );
  }

  // Task 1 Step 81: POST method to create a course
  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      catchError((err) => {
        console.error('Error creating course:', err);
        return throwError(() => new Error('Failed to create course.'));
      })
    );
  }

  // Task 1 Step 82: PUT method to update a course
  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).pipe(
      catchError((err) => {
        console.error('Error updating course:', err);
        return throwError(() => new Error('Failed to update course.'));
      })
    );
  }

  // Task 1 Step 82: DELETE method to delete a course
  deleteCourse(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((err) => {
        console.error('Error deleting course:', err);
        return throwError(() => new Error('Failed to delete course.'));
      })
    );
  }

  // Helper method to get the last fetched courses synchronously
  getCoursesDirectly(): Course[] {
    return this.localCache;
  }
}
