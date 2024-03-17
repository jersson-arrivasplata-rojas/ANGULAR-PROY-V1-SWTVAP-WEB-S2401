import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WProductsHttp {
  private apiUrl = environment.apiUrl + 'api/w-products';

  constructor(private http: HttpClient) { }

  public getWProducts() {
    return this.http.get(this.apiUrl).pipe(
      catchError(error => {
        console.error('Ocurri\u00F3 un error: ', error);
        // lanza el error para que ErrorHandlerService lo maneje
        return throwError(() => error as unknown);
      })
    );
  }

  public getWProductByName(name: string, lang: string) {
    return this.http.get(`${this.apiUrl}/name/${name}/lang/${lang}`).pipe(
      catchError(error => {
        console.error('Ocurri\u00F3 un error: ', error);
        // lanza el error para que ErrorHandlerService lo maneje
        return throwError(() => error as unknown);
      })
    );
  }
}
