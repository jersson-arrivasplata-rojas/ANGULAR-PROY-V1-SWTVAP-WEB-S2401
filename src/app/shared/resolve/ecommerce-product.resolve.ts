import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { EcommerceWhiteEnum } from '../config/ecommerce-routes-white.enum';
import { WProductsHttp } from '../http/w-products.http';
import { ProductInInterface } from '../interfaces/product-in.interface';
import { AnalyticsService } from '../services/analytics.service';
import { TranslateService } from '../services/translate.service';

@Injectable()
export class EcommerceProductResolve implements Resolve<Observable<any>> {

  wProduct: ProductInInterface;

  constructor(
    private router: Router,
    private wProductsHttp: WProductsHttp,
    private translateService: TranslateService,
    private analyticsService: AnalyticsService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log('La ruta actual es', this.document.location.hash.substring(1));
    console.log('Translate', this.translateService.getCurrentLang());
    const lang = this.translateService.getCurrentLang();
    const name = activatedRouteSnapshot.paramMap.get('name');

    return this.wProductsHttp.getWProductByName(name, lang).pipe(
      tap((data: any) => {
        console.log('Data', data);
        this.analyticsService.sendForAnalytics(EcommerceWhiteEnum.PRODUCTS + name);
        this.wProduct = data;
      }),
      catchError((err) => {
        this.router.navigate(['/not-found'], { queryParams: { name: name, lang: lang, type: 'P' } });
        return throwError(() => err);
      })
    );
  }
}

/*return this.wParameterHttp.getWParametersByCode('STORE')
  .pipe(map((data: any) => {
    this.parameters = data;
    this.profile = this.parameters.map(x => x.children.find(item => item.code === HomeEnum.PROFILE));
    this.carrousel = this.parameters.map(x => x.children.find(item => item.code === HomeEnum.CARROUSEL));
    return {
      ...{ profile: this.profile },
      ...{ carrousel: this.carrousel },
    };
  }), catchError((err) => {
    return throwError(() => err);
  }));*/
