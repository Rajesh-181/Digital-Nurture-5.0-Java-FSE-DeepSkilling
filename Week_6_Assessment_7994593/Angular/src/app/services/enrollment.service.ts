import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { Store } from '@ngrx/store';
import { selectEnrolledCourses } from '../store/course.selectors';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  
  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  // Task 2 Step 87: switchMap Http loader endpoint
  // Queries enrollments with embedded student objects from json-server
  getStudentsByCourse(courseId: number): Observable<any[]> {
    const url = `http://localhost:3000/enrollments?courseId=${courseId}&_expand=student`;
    return this.http.get<any[]>(url).pipe(
      map((enrollments) => enrollments.map((e) => e.student))
    );
  }

  // Returns enrolled courses selected from the NgRx Store
  getEnrolledCourses(): Observable<Course[]> {
    return this.store.select(selectEnrolledCourses);
  }
}
