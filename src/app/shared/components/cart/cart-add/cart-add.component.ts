import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'swtvap-cart-add',
  templateUrl: './cart-add.component.html',
  styleUrls: ['./cart-add.component.scss'],
})
export class CartAddComponent {
  @Output() onCheckOut: EventEmitter<any> = new EventEmitter();
  @Output() onProduct: EventEmitter<any> = new EventEmitter();
  @Input() showProduct = false;

  constructor(public cartService: CartService) { }


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
    let text = 'Are you sure you want to clear the cart ?';
    //let text = '¡Presiona el bot\xf3n para limpiar todo el carrito!';

    if (await confirm(text) === true) {
      this.cartService.emptyCart();
      (window as any).success('¡Limpiado!');
    }
  }

  checkOut() {
    this.onCheckOut.emit();
  }

  goToProduct(item: any) {
    this.onProduct.emit(item);
  }
}
