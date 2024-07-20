import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { LangEnum } from 'src/app/shared/config/lang.enum';
import { translateFN } from 'src/app/shared/functions/translate.function';
import { CartService } from 'src/app/shared/services/cart.service';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'swtvap-cart-add',
  templateUrl: './cart-add.component.html',
  styleUrls: ['./cart-add.component.scss'],
})
export class CartAddComponent implements OnInit {
  @Output() onCheckOut: EventEmitter<any> = new EventEmitter();
  @Output() onProduct: EventEmitter<any> = new EventEmitter();
  @Input() showProduct = false;

  showEnglishName = false;
  assetUrl = environment.assetUrl;

  constructor(public cartService: CartService, private translateService: TranslateService) {
    this.translateService.getOnLangChange().subscribe((event: LangChangeEvent) => {
      this.showEnglishName = event.lang === LangEnum.EN;
    });
  }

  ngOnInit(): void {
    this.showEnglishName = this.translateService.getCurrentLang() === LangEnum.EN;
  }


  removeItem(pid) {
    this.cartService.removeItem(pid);
  }

  changeQty(pid, qty, replace) {
    if (qty !== '') {
      qty = parseInt(qty) || 1;
      this.cartService.addToCart(pid, qty, replace);
    } else {
      this.cartService.addToCart(pid, 1, replace);
    }
  }

  async emptyCart() {
    const warning = translateFN()[this.translateService.getCurrentLang()].alert.warningClearCart;
    const cleaned = translateFN()[this.translateService.getCurrentLang()].alert.cleaned;

    //let text = '¡Presiona el bot\xf3n para limpiar todo el carrito!';

    if (await confirm(warning) === true) {
      this.cartService.emptyCart();
      (window as any).success(cleaned);
    }
  }

  checkOut() {
    this.onCheckOut.emit();
  }

  goToProduct(item: any) {
    this.onProduct.emit(item);
  }
}
