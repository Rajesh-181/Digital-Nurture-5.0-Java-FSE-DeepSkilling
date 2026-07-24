import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { EnrollmentService } from '../services/enrollment.service';
import { Course } from '../models/course.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css',
  standalone: false
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;
  enrolledStudents: any[] = [];
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    // Step 69: Read path parameter ':id' from snapshot
    const courseIdStr = this.route.snapshot.paramMap.get('id');
    const courseId = Number(courseIdStr);

    if (courseId) {
      // Fetch details using CourseService
      this.courseService.getCourseById(courseId).subscribe({
        next: (data) => {
          this.course = data;
        },
        error: (err) => {
          this.errorMessage = 'Failed to load course details. ' + err.message;
        }
      });

      // Step 87: Use switchMap to chain loading of enrolled students when course is selected
      /*
        Explanation: switchMap is used here to avoid race conditions. If the user clicks 
        between different course IDs quickly, switchMap will cancel the previous pending 
        requests for student details, subscribing only to the latest course ID request.
      */
      of(courseId).pipe(
        switchMap((id) => this.enrollmentService.getStudentsByCourse(id))
      ).subscribe({
        next: (students) => {
          this.enrolledStudents = students;
        },
        error: (err) => {
          console.error('Failed to load enrolled students list', err);
        }
      });
    } else {
      this.errorMessage = 'Invalid course ID.';
    }
  }
}
