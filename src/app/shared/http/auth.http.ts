/*import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SoaintAccessServices } from '@soaint/common-communication-access';
import { ServicesEnum } from 'src/app/shared/config';
@Injectable()
export class AuthHttp {
  constructor(
    private accessServices: SoaintAccessServices
  ) { }

  login(body: any): Observable<any> {
    return this.accessServices.post<any>(ServicesEnum.LOGIN, body).pipe(
      take(1)
    );
  }

  logout(body: any): Observable<any> {
    return this.accessServices.post<any>(ServicesEnum.LOGOUT, body).pipe(
      take(1)
    );
  }
}
*/
