import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CurrencySymbolEnum } from '../config/currency-symbol.enum';
import { HomeEnum } from '../config/home.enum';
import { ParametersEnum } from '../config/parameters.enum';
import { productInitFN } from '../functions/product.init.function';
import { WCatalogsHttp } from '../http/w-catalogs.http';
import { WParameterHttp } from '../http/w-parameters.http';
import { ParameterInterface } from '../interfaces/parameter.interface';
import { CartService } from '../services/cart.service';
import { CurrencyService } from '../services/currency.service';
import { LocalService } from '../services/local.service';
import { TranslateService } from '../services/translate.service';

@Injectable()
export class EcommerceResolve implements Resolve<Observable<any>> {
  wParameters: any;
  wCatalogs: any;

  parameters: ParameterInterface[];
  profile: ParameterInterface[];
  carrousel: ParameterInterface[];
  public products = productInitFN();

  constructor(private wParameterHttp: WParameterHttp, private wCatalogsHttp: WCatalogsHttp,
    public cartService: CartService, private currencyService: CurrencyService,
    private localService: LocalService, private translateService: TranslateService) { }

  resolve(): Observable<any> {

    this.cartService.allItems = this.products;
    this.cartService.loadCart();
    this.cartService.listCartItems();

    const currency = this.localService.getData('currency') ?? CurrencySymbolEnum.USD;
    this.currencyService.changeCurrency(currency);
    this.localService.saveData('currency', currency);

    const lang = this.translateService.getCurrentLang();

    return this.wCatalogsHttp.getWCatalogsByLang(lang).pipe(
      mergeMap(catalogs => {
        this.wCatalogs = catalogs;

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
