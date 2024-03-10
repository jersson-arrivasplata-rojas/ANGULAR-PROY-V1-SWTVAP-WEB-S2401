import { ConfigValue } from '../decorators/config.value';

export class StoreProfile {
    data: any;

    @ConfigValue('EMAIL')
    email: string;

    @ConfigValue('COMPANY')
    companyName: string;

    @ConfigValue('CELLPHONE')
    cellphone: string;

    @ConfigValue('WHATSAPP')
    whatsapp: string;

    @ConfigValue('ADDRESS')
    address: string;

    @ConfigValue('ADDRESS_MAP')
    addressMap: string;

    constructor(config: any) {
        this.data = config;
    }
}
