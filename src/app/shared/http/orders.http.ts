import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderHttp {
  private apiUrl = environment.apiUrl + 'api/orders';

  constructor(private http: HttpClient) {}

  getSummary(): Observable<any> {
    const url = `${this.apiUrl}/order-summary`;
    return this.http.get<any>(url).pipe(
      map((response: any) => {
        return response; //JSON.stringify(response);
      }),
      catchError(error => {
        console.error('Ocurri\u00F3 un error: ', error);
        // lanza el error para que ErrorHandlerService lo maneje
        return throwError(() => error as unknown);
      })
    );
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((response: any) => {
        return response.map((item: any) => {
          return item;
        });
      }),
      catchError(error => {
        console.error('Ocurri\u00F3 un error: ', error);
        // lanza el error para que ErrorHandlerService lo maneje
        return throwError(() => error as unknown);
      })
    );
  }

  getById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Ocurri\u00F3 un error: ', error);
        // lanza el error para que ErrorHandlerService lo maneje
        return throwError(() => error as unknown);
      })
    );
  }

  add(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data).pipe(
      catchError(error => {
        console.error('Ocurri\u00F3 un error: ', error);
        // lanza el error para que ErrorHandlerService lo maneje
        return throwError(() => error as unknown);
      })
    );
  }

  update(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, data).pipe(
      catchError(error => {
        console.error('Ocurri\u00F3 un error: ', error);
        // lanza el error para que ErrorHandlerService lo maneje
        return throwError(() => error as unknown);
      })
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError(error => {
        console.error('Ocurri\u00F3 un error: ', error);
        // lanza el error para que ErrorHandlerService lo maneje
        return throwError(() => error as unknown);
      })
    );
  }
}
