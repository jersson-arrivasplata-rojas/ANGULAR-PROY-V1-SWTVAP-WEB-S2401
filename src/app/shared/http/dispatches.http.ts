import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StatusProviderEnum } from '../config/status-provider.enum';

@Injectable({
  providedIn: 'root'
})
export class DispatcheHttp {
  private apiUrl = environment.apiUrl + 'api/dispatches';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((response: any) => {
        return response.map((item: any) => {
          item.status = StatusProviderEnum[item.status];
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
