import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WReviewsHttp {
  private apiUrl = environment.apiUrl + 'api/w-reviews';

  constructor(private http: HttpClient) { }

  public addWReviews(data: any) {
    return this.http.post(this.apiUrl, data).pipe(
      catchError(error => {
        console.error('Ocurri\u00F3 un error: ', error);
        // lanza el error para que ErrorHandlerService lo maneje
        return throwError(() => error as unknown);
      })
    );
  }

}
