import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { StoreProfile } from 'src/app/shared/class/store-profile';
import { CurrencySymbolEnum } from 'src/app/shared/config/currency-symbol.enum';
import { CurrencyEnum } from 'src/app/shared/config/currency.enum';
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
  @Output() onAdditionalData: EventEmitter<any> = new EventEmitter();
  @Input() profile: ParameterInterface | any = {};
  @Input() hideNotCart: boolean = false;
  @Input() hideCurrency: boolean = false;
  @Input() cartEmpty: boolean = false;
  @Input() sticky: boolean = true;
  @Input() catalogs: any = [];

  assetUrl = environment.assetUrl;
  homeEnum = HomeEnum;
  currencySymbolEnum = CurrencySymbolEnum;
  currencyEnum = CurrencyEnum;
  profileStore: StoreProfile;
  lang = '';
  currencyActive = '';
  data: any = {};
  showEnglishName = false;
  showCurrencyName = false;

  private translationsSubscription: Subscription;
  private languageSubscription: Subscription;
  private currencySubscription: Subscription;

  constructor(
    private localService: LocalService,
    public cartService: CartService,
    private translateService: TranslateService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.lang = this.translateService.getCurrentLang();
    this.profileStore = new StoreProfile(this.profile);
    this.subscribeToLanguageChange();
    this.fetchTranslations();
    this.subscribeToCurrency();
    this.showEnglishName =
      this.translateService.getCurrentLang() === LangEnum.EN;
  }

  ngOnDestroy(): void {
    // Asegúrate de desuscribirte de todas las suscripciones
    this.translationsSubscription?.unsubscribe();
    this.languageSubscription?.unsubscribe();
    this.currencySubscription?.unsubscribe();
  }

  subscribeToLanguageChange(): void {
    this.languageSubscription = this.translateService
      .getOnLangChange()
      .pipe(tap(() => this.fetchTranslations()))
      .subscribe();
  }

  fetchTranslations(): void {
    // Cancela la suscripción anterior para evitar fugas de memoria
    this.translationsSubscription?.unsubscribe();

    this.translationsSubscription = this.translateService
      .getTranslate('ecommerce.lang')
      .subscribe((data: any) => {
        this.data = data;
      });
  }

  changeCurrency(currency: string) {
    this.localService.saveData('currency', currency);
    this.currencyService.changeCurrency(currency);

    //this.cartService.allItems = this.products;
    this.cartService.loadCart();
    this.cartService.listCartItems();

    this.showCurrencyName = CurrencySymbolEnum.USD == currency;
  }

  changeLang() {
    this.lang = LangEnum.EN == this.lang ? LangEnum.ES : LangEnum.EN;
    this.translateService.switchLanguage(this.lang);
    this.localService.saveData('lang', this.lang);
    this.showEnglishName =
      this.translateService.getCurrentLang() === LangEnum.EN;
  }

  subscribeToCurrency() {
    this.currencySubscription = this.currencyService
      .getCurrenCurrency()
      .subscribe((currency: string) => {
        this.currencyActive =
          CurrencySymbolEnum.PEN == currency
            ? CurrencyEnum.PEN
            : CurrencyEnum.USD;
      });
  }

  cart() {
    this.onCart.emit();
  }

  showProductsByCatalog(catalog: any) {
    if (catalog.products) {
      const products = catalog.products;
      this.cartService.addProducts(products);
      this.cartService.addAdditionalData({ catalog: catalog, category: null });
    }
  }

  showProductsByCategory(catalog: any, category: any) {
    if (category.products) {
      const products = category.products;
      this.cartService.addProducts(products);
      this.cartService.addAdditionalData({ catalog: null, category: category });
    }
  }

  getFilteredCatalogs() {
    let data = this.catalogs.filter(
      (catalog) =>
        catalog.products &&
        catalog.products.length > 0 &&
        catalog.categories &&
        catalog.categories.length == 0
    );
    return data.slice(0, 6);
  }
}
