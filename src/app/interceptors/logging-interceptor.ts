import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const started = performance.now();
  return next(req).pipe(
    finalize(() => console.log(
      `${req.method} ${req.urlWithParams} ${Math.round(performance.now() - started)}ms`)),
  );
};
