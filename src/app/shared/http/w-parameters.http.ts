import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WParameterHttp {
  private apiUrl = environment.apiUrl + 'api/w-parameters';

  constructor(private http: HttpClient) { }

  public getWParametersByCode(code: string) {
    return this.http.get(this.apiUrl+`/code/${code}`).pipe(
      catchError(error => {
        console.error('Ocurri\u00F3 un error: ', error);
        // lanza el error para que ErrorHandlerService lo maneje
        return throwError(() => error as unknown);
      })
    );
  }

}
