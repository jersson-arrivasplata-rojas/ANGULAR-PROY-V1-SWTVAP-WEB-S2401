import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthHttp } from 'src/app/shared/http/auth.http';
import { LocalService } from 'src/app/shared/services/local.service';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authHttp: AuthHttp, private localService: LocalService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return of(this.localService.getData('auth') ? JSON.parse(this.localService.getData('auth')) : null).pipe(
        map(data => {
          if (data && data.refresh_token) {
            return data;
          } else {
            return null;
          }
        }),
        switchMap(data => {
          if (data) {
            // Si el token ha expirado, refrescarlo
            if (CommonUtils.isTokenExpired(data.refresh_token)) {
              return this.authHttp.refreshToken(data.refresh_token).pipe(
                map(response => {
                  if (response) {
                    this.localService.saveData('auth', JSON.stringify(response));
                    this.router.navigate(['/']);
                    return true;
                  } else {
                    this.router.navigate(['/auth/login']);
                    return false;
                  }
                })
              );
            } else {
              // Si el token no ha expirado, simplemente devolver true
              this.router.navigate(['/']);
              return of(true);
            }
          } else {
            return of(null);
          }
        }),
        catchError(() => {
          this.router.navigate(['/auth/login']);
          return of(false);
        })
    );
  }
}
