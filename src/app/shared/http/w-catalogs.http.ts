import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class WCatalogsHttp {
    private wCatalogsCache = new Map<string, any>();

    private apiUrl = environment.apiUrl + 'api/w-catalogs';

    constructor(private http: HttpClient) { }

    public getWCatalogsByLang(lang: string) {
        if (this.wCatalogsCache.has(lang)) {
            // Si los datos ya están en la caché, devuélvelos
            return of(this.wCatalogsCache.get(lang));
        }

        return this.http.get(this.apiUrl + `/${lang}`).pipe(
            tap(data => {
                // Almacena los datos en la caché para futuras solicitudes
                this.wCatalogsCache.set(lang, data);
            }),
            catchError((error) => {
                console.error('Ocurri\u00F3 un error: ', error);
                // lanza el error para que ErrorHandlerService lo maneje
                return throwError(() => error as unknown);
            })
        );
    }
}
