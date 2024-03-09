import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { StoreCurrency } from 'src/app/shared/class/store-currency';
import { StoreProfile } from 'src/app/shared/class/store-profile';
import { HomeEnum } from 'src/app/shared/config/home.enum';
import { LangEnum } from 'src/app/shared/config/lang.enum';
import { ParameterInterface } from 'src/app/shared/interfaces/parameter.interface';
import { CartService } from 'src/app/shared/services/cart.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ShareDataService } from 'src/app/shared/services/share-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'swtvap-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnChanges {

  @Output() onCart: EventEmitter<any> = new EventEmitter();

  @Input() profile: ParameterInterface | any = {};
  @Input() currency: ParameterInterface | any = {};
  @Input() lang: string;
  @Input() hideNotCart: boolean = false;

  assetUrl = environment.assetUrl;
  homeEnum = HomeEnum;
  profileStore: StoreProfile;
  currencyStore: StoreCurrency;

  constructor(private localStorageService: LocalStorageService, private shareDataService: ShareDataService,
    public cartService: CartService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profile'] && changes['profile'].currentValue) {
      this.profileStore = new StoreProfile(this.profile);
      this.changeCurrency();
    }
  }

  cart() {
    this.onCart.emit();
  }

  changeLang() {
    this.localStorageService.setItem('lang', this.lang);
    this.lang = LangEnum.EN == this.lang ? LangEnum.ES : LangEnum.EN;
    this.changeCurrency();
    this.shareDataService.add(this.lang);
  }

  getLang() {
    let text = '';
    if (this.lang == LangEnum.ES) {
      text = this.lang == LangEnum.ES ? 'Espa\u00F1ol' : 'Ingl\u00E9s';
    } else {
      text = this.lang == LangEnum.EN ? 'English' : 'Spanish';
    }

    return text;
  }

  getLangComparate() {
    let text = '';
    if (this.lang == LangEnum.ES) {
      text = this.lang == LangEnum.ES ? 'Ingl\u00E9s' : 'Espa\u00F1ol';
    } else {
      text = this.lang == LangEnum.EN ? 'Spanish' : 'English';
    }

    return text;
  }

  changeCurrency() {
    const currency = this.currency?.children.filter((item: any) => item.value2 === this.lang);
    this.currencyStore = new StoreCurrency({ children: currency });
  }
}
