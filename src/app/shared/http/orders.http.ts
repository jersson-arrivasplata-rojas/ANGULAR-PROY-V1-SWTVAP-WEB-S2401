import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StatusEnum } from '../config/status.enum';

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
        console.error('Ocurrió un error al obtener los datos', error);
        return of([]);
      })
    );
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((response: any) => {
        return response.map((item: any) => {
          item.status = Boolean(item.status === StatusEnum.ACTIVE);
          return item;
        });
      }),
    );
  }

  getById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  add(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  update(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, data);
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
