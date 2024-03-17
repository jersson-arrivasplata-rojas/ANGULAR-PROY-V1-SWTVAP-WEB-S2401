import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { CurrencySymbolEnum } from 'src/app/shared/config/currency-symbol.enum';
import { LangEnum } from 'src/app/shared/config/lang.enum';
import { CartService } from 'src/app/shared/services/cart.service';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { TranslateService } from 'src/app/shared/services/translate.service';

@Component({
  selector: 'swtvap-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() showEnglishName = false;

  @Input('searchedText') __searchedProduct: string = '';
  @Input('sortingBy') sortByOption: string = '';

  @Output() refresh: EventEmitter<any> = new EventEmitter();
  @Output() onProduct: EventEmitter<any> = new EventEmitter();

  __allprdts: any = [];
  currentPage = 0;
  displayedProducts = [];
  showCurrencyName = false;

  constructor(public cartService: CartService, private translateService: TranslateService,
    private currencyService: CurrencyService) {
    this.translateService.getOnLangChange().subscribe((event: LangChangeEvent) => {
      this.showEnglishName = event.lang === LangEnum.EN;
    });
    this.currencyService.getCurrenCurrency().subscribe((currency: string) => {
      this.showCurrencyName = currency === CurrencySymbolEnum.PEN;
    });
  }

  ngOnInit() {
    this.cartService.getProducts().subscribe(data => {
      this.__allprdts = this.cartService.getAllProducts(data);
      this.loadProducts();
    });
    this.__allprdts = this.cartService.allItems;
    this.sortByOption = 'name';
    this.loadProducts();
    this.init();
  }

  addToCart(productId, productQty, productSize?) {
    this.cartService.addToCart(productId, productQty, '');
    this.refresh.emit(true);
  }

  goToProduct(item) {
    this.onProduct.emit(item);
  }

  setCurrentSlide(index, item) {
    item.currentSlide = index;
  }


  loadProducts() {
    const start = 0;
    const end = (this.currentPage + 1) * 10;
    this.displayedProducts = this.__allprdts.slice(start, end);
  }

  loadMoreProducts() {
    this.currentPage++;
    this.loadProducts();
  }
  init(){
    this.showEnglishName = this.translateService.getCurrentLang() === LangEnum.EN;
    this.showCurrencyName = this.currencyService.getCurrentCurrencyValue() === CurrencySymbolEnum.PEN;
  }
}
/*
loadProducts() {
  const start = (this.currentPage - 1) * 10;
  const end = this.currentPage * 10;
  this.displayedProducts = this.__allprdts.slice(start, end);
}
*/