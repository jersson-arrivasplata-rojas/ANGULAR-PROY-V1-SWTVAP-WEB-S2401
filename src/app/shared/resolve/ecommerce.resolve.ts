import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CurrencySymbolEnum } from '../config/currency-symbol.enum';
import { HomeEnum } from '../config/home.enum';
import { ParametersEnum } from '../config/parameters.enum';
import { WCatalogsHttp } from '../http/w-catalogs.http';
import { WParameterHttp } from '../http/w-parameters.http';
import { ParameterInterface } from '../interfaces/parameter.interface';
import { CartService } from '../services/cart.service';
import { CurrencyService } from '../services/currency.service';
import { LocalService } from '../services/local.service';

@Injectable()
export class EcommerceResolve implements Resolve<Observable<any>> {
  wParameters: any;
  wCatalogs: any;

  parameters: ParameterInterface[];
  profile: ParameterInterface[];
  carrousel: ParameterInterface[];

  constructor(private wParameterHttp: WParameterHttp, private wCatalogsHttp: WCatalogsHttp,
    public cartService: CartService, private currencyService: CurrencyService,
    private localService: LocalService) { }

  resolve(): Observable<any> {

    const currency = this.localService.getData('currency') ?? CurrencySymbolEnum.USD;
    this.currencyService.changeCurrency(currency);
    this.localService.saveData('currency', currency);


    return this.wCatalogsHttp.getWCatalogs().pipe(
      mergeMap(catalogs => {
        this.wCatalogs = catalogs;

        const products = this.cartService.findAllProductsByCatalogs(catalogs);
        this.cartService.addProducts(products);

        return this.wParameterHttp.getWParametersByCode(ParametersEnum.STORE)
          .pipe(map((data: any) => {
            this.parameters = data;
            this.profile = this.parameters.map(x => x.children.find(item => item.code === HomeEnum.PROFILE));
            this.carrousel = this.parameters.map(x => x.children.find(item => item.code === HomeEnum.CARROUSEL));
            return {
              wCatalogs: this.wCatalogs,
              wParameters: {
                ...{ profile: this.profile },
                ...{ carrousel: this.carrousel },
              }
            };
          }));
      }),
      catchError((err) => {
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
