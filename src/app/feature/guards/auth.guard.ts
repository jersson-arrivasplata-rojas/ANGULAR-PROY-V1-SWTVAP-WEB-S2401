import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthHttp } from 'src/app/shared/http/auth.http';
import { AuthResponseInterface } from 'src/app/shared/interfaces/auth-response.interface';
import { LocalService } from 'src/app/shared/services/local.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authHttp: AuthHttp,
    private localService: LocalService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return of(this.tokenService.authLocal()).pipe(
      map(data => {
        return this.tokenService.tokenLocal(data)
      }),
      switchMap((data: AuthResponseInterface) => {
        if (data) {
          if (CommonUtils.isTokenExpired(data.access_token)) {
            return this.authHttp.refreshToken(data.refresh_token).pipe(
              map((response: AuthResponseInterface | null) => {
                if (response) {
                  this.localService.saveData('auth', JSON.stringify(response));
                  this.redirectTo();
                  return false;
                }
                return true;
              }),
              catchError(() => {
                return of(true);
              })
            );
          }
          this.redirectTo();
          return of(false);
        }
        return of(true);
      }),
      catchError(() => {
        return of(true);
      })
    )
  }


  private redirectTo() {
    this.router.navigate(['/admin/dashboard/catalogs']);
  }
}
