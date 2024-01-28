import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ServicesEnum } from '../config/services.enum';
@Injectable()
export class AuthHttp {
  apiUrl = environment.apiUrl;

  constructor(
    private accessServices: HttpClient
  ) { }

  login(body: any): Observable<any> {
    return this.accessServices.post<any>(this.apiUrl + ServicesEnum.LOGIN, body).pipe(
      take(1)
    );
  }

  logout(body: any): Observable<any> {
    return this.accessServices.post<any>(this.apiUrl + ServicesEnum.LOGOUT, body).pipe(
      take(1)
    );
  }

  refreshToken(body: any): Observable<any> {
    return this.accessServices.post<any>(this.apiUrl + ServicesEnum.REFRESH_TOKEN, body).pipe(
      take(1),
    );
  }
}
