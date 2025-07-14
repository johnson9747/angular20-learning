import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

// The type for google.accounts.id.prompt's notification argument
type PromptMomentNotification = google.accounts.id.PromptMomentNotification;

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const idToken = authService.idToken();

  // Clone the request to add the authorization header if a token exists.
  const authorizedReq = idToken
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${idToken}` },
      })
    : req;

  return next(authorizedReq).pipe(
    catchError((error: unknown) => {
      // We only want to handle 401 Unauthorized errors.
      if (!(error instanceof HttpErrorResponse) || error.status !== 401) {
        return throwError(() => error);
      }

      // For 401s, return a new observable that handles the token refresh and retry.
      return new Observable<HttpEvent<unknown>>(subscriber => {
        // Trigger the Google One Tap prompt to refresh the token.
        google.accounts.id.prompt((notification: PromptMomentNotification) => {
          if (notification.isDismissedMoment() && notification.getDismissedReason() === 'credential_returned') {
            // A new token should now be available in the auth service.
            const newToken = authService.idToken();
            if (newToken) {
              // Retry the request with the new token.
              const retryReq = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
              // Subscribe to the retried request and forward events to our subscriber.
              next(retryReq).subscribe(subscriber);
            } else {
              // If we still don't have a token, log out and propagate the error.
              authService.logout();
              subscriber.error(error);
            }
          } else if (notification.isSkippedMoment() || notification.isDismissedMoment()) {
            // The prompt was skipped or dismissed without a credential.
            // Log out and propagate the original error.
            authService.logout();
            subscriber.error(error);
          }
        });
      });
    })
  );
};
