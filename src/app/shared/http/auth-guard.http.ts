import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthStoreInterface as AuthStore } from 'src/app/shared/interfaces/auth-store.interface';
import { AuthUserInterface as AuthUser } from 'src/app/shared/interfaces/auth-user.interface';
import { CountryInterface } from 'src/app/shared/interfaces/country.interface';
import countriesJson from '../json/paises.json';
import { LocalStorageService } from '../services/local-storage.service';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardHttp {


  headers = { 'content-type': 'application/json'};

  constructor(private http: HttpClient, private messageService: MessageService, private localStorageService:LocalStorageService) { }

  login(user:AuthUser): Observable<any> {
    const body=JSON.stringify(user);

    return this.http.post(environment.apiUrl+'user/authenticate', body,
    {
      'headers': this.headers ,
      observe: 'response'
    });
  }
  getProfile(): Observable<any> {
    //
    let headers = {
      'content-type': 'application/json',
      'Authorization': this.localStorageService.getItem('accessToken')
    };
    return this.http.get(environment.apiUrl+'user/profile',
    {
      'headers': headers ,
      observe: 'response'
    });
  }
  getAllCarts(): Observable<any> {
    //
    let headers = {
      'content-type': 'application/json',
      'Authorization': this.localStorageService.getItem('accessToken')
    };
    return this.http.get(environment.apiUrl+'user/carts/all',
    {
      'headers': headers ,
      observe: 'response'
    });
  }
  getAllLinks(): Observable<any> {
    //
    let headers = {
      'content-type': 'application/json',
      'Authorization': this.localStorageService.getItem('accessToken')
    };
    return this.http.get(environment.apiUrl+'user/links/all',
    {
      'headers': headers ,
      observe: 'response'
    });
  }

  getAllBuys(): Observable<any> {
    //
    let headers = {
      'content-type': 'application/json',
      'Authorization': this.localStorageService.getItem('accessToken')
    };
    return this.http.get(environment.apiUrl+'user/buys/all',
    {
      'headers': headers ,
      observe: 'response'
    });
  }
  /*loginAuth(user:Social): Observable<any> {
    const body=JSON.stringify(user);

    return this.http.post(environment.apiUrl+'user/authenticate-social', body,
    {
      'headers': this.headers ,
      observe: 'response'
    });
  }*/

  forgotPassword(user:AuthUser): Observable<any> {
    let body = this.encodeQueryData(user);

    return this.http.get(environment.apiUrl+'password/reset?'+body,
    {
      'headers': this.headers ,
      observe: 'response'
    });
  }

  resetPassword(user:AuthUser): Observable<any> {
    const body=JSON.stringify(user);

    return this.http.post(environment.apiUrl+'password/reset', body,
    {
      'headers': this.headers ,
      observe: 'response'
    });
  }

  encodeQueryData(data) {
    let result = [];
    for (let d in data)
      result.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return result.join('&');
  }

  addUser(user: AuthUser): Observable<any> {
    const body=JSON.stringify(user);

    return this.http.post(environment.apiUrl+'user/register', body,
    {
      'headers': this.headers ,
      observe: 'response'
    });
  }

  addPayment(payment: any): Observable<any> {
    //const body=JSON.stringify(payment);
    return this.http.post(environment.apiUrl+'user/payment', payment,
    {
      'headers': this.headers ,
      observe: 'response'
    });
  }

  addStore(user: AuthStore): Observable<any> {
    const body=JSON.stringify(user);

    return this.http.post(environment.apiUrl+'store/register', body,
    {
      'headers': this.headers ,
      observe: 'response'
    });

  }
  signOut(){
    this.localStorageService.removeItem('accessToken');
    this.localStorageService.removeItem('stores_uri');
    this.localStorageService.removeItem('type');
  }

  getType():number{
    let type:any = this.localStorageService.getItem('type');
    if((type==null||typeof type=='undefined'|| type=='')){
      return 1;
    }
    if(isNaN(type)) return 1
    return parseInt(type);
  }
  /** GET hero by id. Will 404 if id not found */
  getAllContries():CountryInterface[]{
    let arrayCountry=new Array();
    countriesJson.map(resp => {
      let data: CountryInterface = {
        id: resp.id,
        name_es: resp.name_es,
        name_en: resp.name_en,
        nom: resp.nom,
        iso2: resp.iso2,
        iso3: resp.iso3,
        phone_code: resp.phone_code
      };
      arrayCountry.push(data)
    });
    return arrayCountry;
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
   /** Log a HeroService message with the MessageService */
   private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}


//(resp.phone_code || resp.phone_code.toString())

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */



/*.pipe(
  //map(this.handleResponse),
  //retry(3),
  catchError(this.handleError('addStore', user))
)*/

//https://stackoverrun.com/de/q/12164358
//https://github.com/johnpapa/angular-tour-of-heroes/issues/94
//https://www.npmjs.com/package/angular-in-memory-web-api
//https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular8-app-with-ngx-translate

 //////// Save methods //////////
//https://angular.io/guide/http#reading-the-full-response
  /** POST: add a new hero to the server */
//https://www.tektutorialshub.com/angular/angular-http-post-example/
