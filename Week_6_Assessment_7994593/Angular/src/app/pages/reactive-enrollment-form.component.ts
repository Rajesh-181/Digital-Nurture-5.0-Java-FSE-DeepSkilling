import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HasUnsavedChanges } from '../guards/unsaved-changes.guard';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';

// Custom Synchronous Validator
// Task 2 Step 53: Validates that the control value does not start with prefix 'XX'
export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = (control.value || '').toString();
  if (value.toUpperCase().startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

// Custom Async Validator
// Task 2 Step 55: Simulates a check against taken emails after 800ms
export function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const email = (control.value || '').toString();
      // If email has 'test@', return taken error
      if (email.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  templateUrl: './reactive-enrollment-form.component.html',
  styleUrl: './reactive-enrollment-form.component.css',
  standalone: false
})
export class ReactiveEnrollmentFormComponent implements OnInit, HasUnsavedChanges {
  enrollForm!: FormGroup;
  submitted: boolean = false;
  submitError: string = '';

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    // Task 1 Step 49: Form setup using FormBuilder
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: ['', [Validators.required, Validators.email], [simulateEmailCheck]],
      courseId: ['', [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([])
    });
  }

  // Task 2 Step 57: FormArray getter
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  // Task 2 Step 56: Adds a new FormControl with validators to the FormArray
  addCourse(): void {
    const control = new FormControl('', [Validators.required, noCourseCode]);
    this.additionalCourses.push(control);
  }

  // Task 2 Step 56: Removes a FormControl at index from the FormArray
  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  // Task 1 Step 51 & Task 1 Step 81: Submit handler with HTTP POST
  onSubmit(): void {
    console.log('Reactive Form Submitted!');
    
    // Logs form value and raw value
    console.log('enrollForm.value (excludes disabled):', this.enrollForm.value);
    console.log('enrollForm.getRawValue() (includes all):', this.enrollForm.getRawValue());
    
    if (this.enrollForm.valid) {
      const formValue = this.enrollForm.value;
      
      // Simulate registering the course from the form details by calling HTTP POST
      const newCourse: Course = {
        id: Math.floor(Math.random() * 1000) + 200, // Generate random temporary ID
        name: `${formValue.studentName}'s Selected Course`,
        code: formValue.courseId,
        credits: 3,
        gradeStatus: 'pending'
      };

      // Call CourseService to trigger POST request to mock JSON-server
      this.courseService.createCourse(newCourse).subscribe({
        next: (savedCourse) => {
          console.log('Course successfully registered via HTTP POST:', savedCourse);
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

  // Task 2 Step 77: UnsavedChangesGuard check
  canDeactivate(): boolean {
    if (this.enrollForm && this.enrollForm.dirty && !this.submitted) {
      return window.confirm('You have unsaved changes. Leave?');
    }
    return true;
  }

  // Resets the reactive form
  onReset(): void {
    this.enrollForm.reset({
      studentName: '',
      studentEmail: '',
      courseId: '',
      preferredSemester: 'Odd',
      agreeToTerms: false
    });
    this.additionalCourses.clear();
    this.submitted = false;
    this.submitError = '';
  }

  // Helper method to cast AbstractControl to FormControl in templates
  asFormControl(control: AbstractControl): FormControl {
    return control as FormControl;
  }
}
