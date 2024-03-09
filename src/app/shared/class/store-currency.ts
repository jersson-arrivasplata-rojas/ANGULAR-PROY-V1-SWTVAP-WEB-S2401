import { ConfigValue } from '../decorators/config.value';

export class StoreCurrency {
    data: any;

    @ConfigValue('CURRENCY_USD', 1)
    currencyUSD: string;

    @ConfigValue('CURRENCY_PEN', 1)
    currencyPEN: string;

    @ConfigValue('CURRENCY_EUR', 1)
    currencyEUR: string;

    constructor(config: any) {
        this.data = config;
    }
}
