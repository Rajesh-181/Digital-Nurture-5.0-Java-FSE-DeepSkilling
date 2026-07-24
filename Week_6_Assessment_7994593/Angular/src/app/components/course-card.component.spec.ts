import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseCardComponent } from './course-card.component';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SimpleChange } from '@angular/core';
import { CreditLabelPipe } from '../pipes/credit-label.pipe';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;
  let store: MockStore;
  const initialState = { course: { enrolledCourseIds: [] } };

  // Task 1 Step 101: Configure TestBed before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CourseCardComponent,
        CreditLabelPipe // declare pipe since card template uses it
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  // Task 1 Step 102: Verifying component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Task 1 Step 103: Testing @Input rendering in h3 element
  it('should render course name inside template h3 tag', () => {
    component.course = {
      id: 123,
      name: 'Data Structures',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed'
    };
    fixture.detectChanges();

    const h3Element = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(h3Element.textContent).toContain('Data Structures');
  });

  // Task 1 Step 104: Testing @Output enrollRequested event emitter click trigger
  it('should emit course id when enroll button is clicked', () => {
    component.course = {
      id: 123,
      name: 'Data Structures',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed'
    };
    fixture.detectChanges();

    spyOn(component.enrollRequested, 'emit');

    // Click the first button which is the Enroll button in the card
    const enrollBtn = fixture.debugElement.query(By.css('button')).nativeElement;
    enrollBtn.click();

    expect(component.enrollRequested.emit).toHaveBeenCalledWith(123);
  });

  // Task 1 Step 105: Testing ngOnChanges logger
  it('should log current and previous course values to console on changes', () => {
    spyOn(console, 'log');

    const prevCourse = { id: 123, name: 'Data Structures', code: 'CS101', credits: 4 };
    const currCourse = { id: 123, name: 'Intro to Data Structures', code: 'CS101', credits: 4 };

    component.course = currCourse;
    
    // Call changes lifecycle trigger
    component.ngOnChanges({
      course: new SimpleChange(prevCourse, currCourse, false)
    });

    expect(console.log).toHaveBeenCalled();
  });
});
