import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // BehaviorSubject to track the current loading state
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  // Exposing the loading state as an observable for the UI to consume via the async pipe
  isLoading$ = this.loadingSubject.asObservable();

  constructor() { }

  show(): void {
    this.loadingSubject.next(true);
  }

  hide(): void {
    this.loadingSubject.next(false);
  }
}
