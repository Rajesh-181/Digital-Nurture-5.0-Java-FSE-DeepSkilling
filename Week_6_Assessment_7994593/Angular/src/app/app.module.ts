import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// NgRx Store Imports
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { courseReducer } from './store/course.reducer';
import { CourseEffects } from './store/course.effects';

// Http Interceptors
import { authInterceptor } from './interceptors/auth.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';
import { loadingInterceptor } from './interceptors/loading.interceptor';

// Custom Page Components
import { HomeComponent } from './pages/home.component';
import { CoursesLayoutComponent } from './pages/courses-layout.component';
import { CourseListComponent } from './pages/course-list.component';
import { CourseDetailComponent } from './pages/course-detail.component';
import { StudentProfileComponent } from './pages/student-profile.component';
import { NotFoundComponent } from './pages/not-found.component';

// Custom Child Components
import { CourseCardComponent } from './components/course-card.component';
import { CourseSummaryWidgetComponent } from './components/course-summary-widget.component';
import { NotificationComponent } from './components/notification.component';

// Custom Directives and Pipes
import { HighlightDirective } from './directives/highlight.directive';
import { CreditLabelPipe } from './pipes/credit-label.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoursesLayoutComponent,
    CourseListComponent,
    CourseDetailComponent,
    StudentProfileComponent,
    NotFoundComponent,
    CourseCardComponent,
    CourseSummaryWidgetComponent,
    NotificationComponent,
    HighlightDirective,
    CreditLabelPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // Task 1 Step 92: Register NgRx Store and devtools
    StoreModule.forRoot({ course: courseReducer }),
    // Task 2 Step 97: Register NgRx Effects
    EffectsModule.forRoot([CourseEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [
    // Register HttpClient and interceptors
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        errorInterceptor,
        loadingInterceptor
      ])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
