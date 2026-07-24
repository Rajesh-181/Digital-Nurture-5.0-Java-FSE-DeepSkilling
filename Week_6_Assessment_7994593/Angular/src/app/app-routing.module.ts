import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { CoursesLayoutComponent } from './pages/courses-layout.component';
import { CourseListComponent } from './pages/course-list.component';
import { CourseDetailComponent } from './pages/course-detail.component';
import { StudentProfileComponent } from './pages/student-profile.component';
import { NotFoundComponent } from './pages/not-found.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  
  // Task 1 Step 72: Nested routing under '/courses'
  {
    path: 'courses',
    component: CoursesLayoutComponent,
    children: [
      { path: '', component: CourseListComponent },
      { path: ':id', component: CourseDetailComponent }
    ]
  },
  
  // Task 2 Step 76: Protecting '/profile' route using authGuard
  { 
    path: 'profile', 
    component: StudentProfileComponent, 
    canActivate: [authGuard] 
  },
  
  // Task 2 Step 73 & 76: Lazy-loading the EnrollmentModule under '/enroll' protected by authGuard
  {
    path: 'enroll',
    canActivate: [authGuard],
    loadChildren: () => import('./features/enrollment/enrollment.module').then(m => m.EnrollmentModule)
  },
  
  // Task 1 Step 68: Wildcard route pointing to NotFoundComponent
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
