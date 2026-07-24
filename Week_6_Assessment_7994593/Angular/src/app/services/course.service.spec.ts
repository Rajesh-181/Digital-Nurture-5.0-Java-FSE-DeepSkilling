import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  // Task 2 Step 106: Configure TestBed with HttpClientTestingModule
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Task 2 Step 107: Verify no outstanding requests after each test
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Task 2 Step 107: Testing getCourses Observable and mocking responses
  it('should return courses that have credits greater than 0', () => {
    const mockCourses: Course[] = [
      { id: 101, name: 'Angular 19', code: 'CS101', credits: 3, gradeStatus: 'passed' },
      { id: 102, name: 'Empty Credits Course', code: 'CS102', credits: 0, gradeStatus: 'pending' } // Should be filtered out
    ];

    service.getCourses().subscribe((courses) => {
      // Expect course CS102 (credits: 0) to be filtered out by the map operator
      expect(courses.length).toBe(1);
      expect(courses[0].id).toBe(101);
      expect(courses[0].name).toBe('Angular 19');
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    
    // Flush the mock responses to the subscriber
    req.flush(mockCourses);
  });

  it('should catch errors and emit custom error message when API fails', () => {
    service.getCourses().subscribe({
      next: () => fail('Should have failed with error'),
      error: (err) => {
        expect(err.message).toBe('Failed to load courses. Please try again later.');
      }
    });

    // Flush the initial request plus the 2 retries (total of 3 requests) due to retry(2)
    for (let i = 0; i < 3; i++) {
      const req = httpMock.expectOne('http://localhost:3000/courses');
      req.flush('Error loading data', { status: 500, statusText: 'Internal Server Error' });
    }
  });
});
