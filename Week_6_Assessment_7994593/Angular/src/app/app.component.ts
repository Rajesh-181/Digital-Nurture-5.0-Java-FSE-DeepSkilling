import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title: string = 'student-course-portal';
  isLoading$: Observable<boolean> | undefined;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    // Task 3 Step 91: Bind global loading state to component
    this.isLoading$ = this.loadingService.isLoading$;
  }
}
