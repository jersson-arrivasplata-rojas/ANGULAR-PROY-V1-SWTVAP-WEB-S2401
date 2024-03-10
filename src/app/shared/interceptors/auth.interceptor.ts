import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthHttp } from 'src/app/shared/http/auth.http';
import { AuthResponseInterface } from 'src/app/shared/interfaces/auth-response.interface';
import { LocalService } from 'src/app/shared/services/local.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { ServiceWhiteEnum } from '../config/services-white.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authHttp: AuthHttp,
    private localService: LocalService,
    private tokenService: TokenService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (Object.values(ServiceWhiteEnum).some(route => req.url.includes(route))) {
      return next.handle(req);
    }

    return of(this.tokenService.authLocal()).pipe(
      map(data => {
        return this.tokenService.tokenLocal(data)
      }),
      switchMap((data: AuthResponseInterface) => {
        if (data) {
          if (CommonUtils.isTokenExpired(data.access_token)) {
            return this.authHttp.refreshToken(data.refresh_token).pipe(
              switchMap((response: AuthResponseInterface | null) => {
                if (response) {
                  this.localService.saveData('auth', JSON.stringify(response));
                  const authReq = req.clone({
                    setHeaders: {
                      Authorization: `Bearer ${response.access_token}`
                    }
                  });
                  return next.handle(authReq);
                }
                throw new Error('Authentication failed');
              }),
              catchError(() => {
                throw new Error('Authentication failed');
              })
            );
          }
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${data.access_token}`
            }
          });
          return next.handle(authReq);
        }
        throw new Error('Authentication failed');
      }),
      catchError(() => {
        throw new Error('Authentication failed');
      })
    );
  }
}
