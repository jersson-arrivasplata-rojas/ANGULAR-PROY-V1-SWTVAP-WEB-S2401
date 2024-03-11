import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrencySymbolEnum } from '../config/currency-symbol.enum';

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {
    private currency = new BehaviorSubject<string>(CurrencySymbolEnum.PEN); // Valor por defecto

    constructor() { }

    changeCurrency(currency: string) {
        this.currency.next(currency);
    }

    getCurrentCurrencyValue(): string {
        return this.currency.getValue();
    }

    getCurrenCurrency() {
        return this.currency.asObservable();
    }
}
