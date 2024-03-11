import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { StoreProfile } from 'src/app/shared/class/store-profile';
import { CurrencySymbolEnum } from 'src/app/shared/config/currency-symbol.enum';
import { HomeEnum } from 'src/app/shared/config/home.enum';
import { LangEnum } from 'src/app/shared/config/lang.enum';
import { ParameterInterface } from 'src/app/shared/interfaces/parameter.interface';
import { CartService } from 'src/app/shared/services/cart.service';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { LocalService } from 'src/app/shared/services/local.service';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'swtvap-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {

  @Output() onCart: EventEmitter<any> = new EventEmitter();
  @Input() profile: ParameterInterface | any = {};
  @Input() hideNotCart: boolean = false;
  @Input() hideCurrency: boolean = false;

  assetUrl = environment.assetUrl;
  homeEnum = HomeEnum;
  currencySymbol = CurrencySymbolEnum;
  profileStore: StoreProfile;
  lang = '';

  data: any = {};

  private translationsSubscription: Subscription;
  private languageSubscription: Subscription;

  constructor(private localService: LocalService, public cartService: CartService,
    private translateService: TranslateService, private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.lang = this.translateService.getCurrentLang();
    this.profileStore = new StoreProfile(this.profile);
    this.subscribeToLanguageChange();
    this.fetchTranslations();
  }

  ngOnDestroy(): void {
    // Asegúrate de desuscribirte de todas las suscripciones
    this.translationsSubscription?.unsubscribe();
    this.languageSubscription?.unsubscribe();
  }

  subscribeToLanguageChange(): void {
    this.languageSubscription = this.translateService.getOnLangChange()
      .pipe(tap(() => this.fetchTranslations()))
      .subscribe();
  }

  fetchTranslations(): void {
    // Cancela la suscripción anterior para evitar fugas de memoria
    this.translationsSubscription?.unsubscribe();

    this.translationsSubscription = this.translateService.getTranslate('ecommerce.lang')
      .subscribe((data: any) => {
        this.data = data;
      });
  }

  changeCurrency(currency: string) {
    this.currencyService.changeCurrency(currency);
  }

  changeLang() {
    this.lang = LangEnum.EN == this.lang ? LangEnum.ES : LangEnum.EN;
    this.translateService.switchLanguage(this.lang);
    this.localService.saveData('lang', this.lang);

  }

  cart() {
    this.onCart.emit();
  }
}
