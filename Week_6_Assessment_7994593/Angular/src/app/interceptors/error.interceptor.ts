import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

/*
  Task 1 Step 90 Explanation Comment:
  
  This global error interceptor intercepts all HTTP response events from the application. 
  By piping catchError onto next(req), we can inspect response errors (like 401 Unauthorized, 
  500 Server Error) before they reach the component subscribers. This is useful for centrally 
  logging errors, displaying global notification banners, or redirecting to error pages.
*/
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      console.error('Global HTTP Error caught by ErrorInterceptor:', err);
      
      // Pass the error back down the stream to allow specific components to react as well
      return throwError(() => err);
    })
  );
};
