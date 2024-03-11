import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CurrencySymbolEnum } from '../config/currency-symbol.enum';
import { HomeEnum } from '../config/home.enum';
import { productInitFN } from '../functions/product.init.function';
import { WParameterHttp } from '../http/w-parameters.http';
import { ParameterInterface } from '../interfaces/parameter.interface';
import { CartService } from '../services/cart.service';
import { CurrencyService } from '../services/currency.service';
import { LocalService } from '../services/local.service';

@Injectable()
export class EcommerceResolve implements Resolve<Observable<any>> {

  parameters: ParameterInterface[];
  profile: ParameterInterface[];
  carrousel: ParameterInterface[];
  public products = productInitFN();

  constructor(private wParameterHttp: WParameterHttp, public cartService: CartService,
    private currencyService: CurrencyService, private localService: LocalService) { }

  resolve(): Observable<any> {

    this.cartService.allItems = this.products;
    this.cartService.loadCart();
    this.cartService.listCartItems();

    const currency = this.localService.getData('currency') ?? CurrencySymbolEnum.USD;
    this.currencyService.changeCurrency(currency);
    this.localService.saveData('currency', currency);

    return this.wParameterHttp.getWParametersByCode('STORE')
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
      }));
  }
}
