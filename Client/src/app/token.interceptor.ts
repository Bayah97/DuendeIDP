import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

    var token = sessionStorage.getItem('token');
    const clonedRequest = request.clone({ headers: request.headers.set('Authorization', `Bearer ` + token ) });
    return next.handle(clonedRequest).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log("token has expired")
          return from(this.authService.refreshToken()).pipe(
            switchMap(token=>{
              request=request.clone({
                setHeaders:{
                  Authorization:`Bearer ${token}`
                }
              });
              return next.handle(request);
            })
          );
        }
      return next.handle(clonedRequest);
    }),
    )}
}
