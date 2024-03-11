import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { take } from 'rxjs/operators';
import { CurrencyService } from '../services/currency.service';

@Pipe({
    name: 'currencyCustom',
    pure: false // Esto hace que el pipe sea impuro y se actualice con cada cambio de detección
})
export class CurrencyCustomPipe implements PipeTransform {
    private currentCurrency: string;

    constructor(private currencyService: CurrencyService, private currencyPipe: CurrencyPipe) {
        this.currencyService.getCurrenCurrency().pipe(take(1)).subscribe(currency => {
            this.currentCurrency = currency;
        });
    }

    transform(value: any, ...args: any[]): any {
        let data = this.currencyService.getCurrentCurrencyValue();
        return this.currencyPipe.transform(value, data, 'symbol', '1.2-2');
    }
}
