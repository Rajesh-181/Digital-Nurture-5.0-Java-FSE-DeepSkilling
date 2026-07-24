import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs/operators';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Task 1 Step 91: Show global loading spinner before request starts
  loadingService.show();

  return next(req).pipe(
    finalize(() => {
      // Task 1 Step 91: Hide global loading spinner when request finishes (success or error)
      loadingService.hide();
    })
  );
};
