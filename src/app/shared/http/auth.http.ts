import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ServicesEnum } from '../config/services.enum';
@Injectable()
export class AuthHttp {
  apiUrl = environment.apiUrl;
  appUrl = environment.appUrl;

  constructor(
    private accessServices: HttpClient
  ) { }

  login(body: any): Observable<any> {
    return this.accessServices.post<any>(this.apiUrl + ServicesEnum.LOGIN, body).pipe(
      take(1)
    );
  }

  logout(idToken: any): Observable<any> {
    const params = `?redirectUri=${this.appUrl}?logout=true&idToken=${idToken}`;
    return this.accessServices.get<any>(this.apiUrl + ServicesEnum.LOGOUT + params).pipe(
      take(1)
    );
  }

  refreshToken(refreshToken: any): Observable<any> {
    const body = { refreshToken: refreshToken };
    return this.accessServices.post<any>(this.apiUrl + ServicesEnum.REFRESH_TOKEN, body).pipe(
      take(1),
    );
  }
}
