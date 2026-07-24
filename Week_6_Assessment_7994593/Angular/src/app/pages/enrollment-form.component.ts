import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrl: './enrollment-form.component.css',
  standalone: false
})
export class EnrollmentFormComponent {
  studentName: string = '';
  studentEmail: string = '';
  courseId: number | null = null;
  preferredSemester: string = 'Odd';
  agreeToTerms: boolean = false;
  
  submitted: boolean = false;
  submitError: string = '';

  constructor(private courseService: CourseService) {}

  // Task 1 Step 81: Submit handler with HTTP POST integration
  onSubmit(form: NgForm): void {
    console.log('Template-Driven Form submitted!');
    console.log('Form validity:', form.valid);
    console.log('Form value structure:', form.value);
    
    if (form.valid) {
      const formValue = form.value;

      // Map form fields to a Course object to POST to JSON-server
      const newCourse: Course = {
        id: Number(formValue.courseId),
        name: `${formValue.studentName}'s Selected Course (Template)`,
        code: 'REG' + formValue.courseId,
        credits: 4,
        gradeStatus: 'pending'
      };

      // Call CourseService to trigger HTTP POST
      this.courseService.createCourse(newCourse).subscribe({
        next: (savedCourse) => {
          console.log('Course successfully created via HTTP POST:', savedCourse);
          this.submitted = true;
          this.submitError = '';
        },
        error: (err) => {
          console.error('HTTP POST course registration failed:', err);
          this.submitError = 'Failed to submit enrollment request to API. Is json-server running?';
        }
      });
    }
  }

  // Resets the template form values and validation classes
  onReset(form: NgForm): void {
    form.resetForm({
      preferredSemester: 'Odd',
      agreeToTerms: false
    });
    this.submitted = false;
    this.submitError = '';
  }
}
