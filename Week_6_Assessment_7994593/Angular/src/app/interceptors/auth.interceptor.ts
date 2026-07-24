import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('AuthInterceptor intercepts request:', req.url);

  // Task 1 Step 88: Clone the request and add custom Authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer mock-token-12345'
    }
  });

  return next(authReq);
};
