import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthHttp } from 'src/app/shared/http/auth.http';
import { TokenService } from 'src/app/shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {

  constructor(private authHttp: AuthHttp, private tokenService: TokenService,
    private router: Router) { }

  canActivate() {
    const auth = this.tokenService.authLocal();
    const data = this.tokenService.tokenLocal(auth);
    return this.authHttp.logout(data.id_token).pipe(
      map(_ => {
        this.tokenService.removeTokenLocal();
        this.router.navigate(['/auth/login']);
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    )
  }
}
