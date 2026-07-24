import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseListComponent } from './course-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { CourseCardComponent } from '../components/course-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { CreditLabelPipe } from '../pipes/credit-label.pipe';
import { HighlightDirective } from '../directives/highlight.directive';

describe('CourseListComponent (NgRx)', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let store: MockStore;
  
  // Set up mock initial state with one sample course loaded
  const initialState = {
    course: {
      courses: [
        { id: 101, name: 'Angular Test Course', code: 'CS101', credits: 3, gradeStatus: 'passed' }
      ],
      loading: false,
      error: null,
      enrolledCourseIds: []
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CourseListComponent,
        CourseCardComponent,
        CreditLabelPipe,
        HighlightDirective
      ],
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    
    fixture.detectChanges();
  });

  // Task 2 Step 109: Assert cards match mock initial state
  it('should render correct number of course cards corresponding to store courses', () => {
    const cards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(cards.length).toBe(1);
  });

  // Task 2 Step 110: Test loading indicator display
  it('should display loading text when store loading state is set to true', () => {
    // Override state to trigger loading
    store.setState({
      course: {
        courses: [],
        loading: true,
        error: null,
        enrolledCourseIds: []
      }
    });

    fixture.detectChanges();

    // The element with class loading-notice should exist and show text
    const loadingEl = fixture.debugElement.query(By.css('.loading-notice'));
    expect(loadingEl).toBeTruthy();
    expect(loadingEl.nativeElement.textContent).toContain('Loading courses from JSON-Server...');
  });
});
