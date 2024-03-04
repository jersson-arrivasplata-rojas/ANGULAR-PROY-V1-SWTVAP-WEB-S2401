import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'swtvap-cart-add',
  templateUrl: './cart-add.component.html',
  styleUrls: ['./cart-add.component.scss'],
})
export class CartAddComponent {
  @Output() onCheckOut: EventEmitter<any> = new EventEmitter();

  constructor(public cart: CartService) {}

  changeQty(pid, qty, replace) {
    if (qty !== '') {
      qty = parseInt(qty) || 1;
      this.cart.addToCart(pid, qty, replace);
    } else {
      this.cart.addToCart(pid, 1, replace);
    }
  }

  emptyCart() {
    let cartStatus = confirm('Are you sure you want to clear the cart ?');
    if (cartStatus) {
      this.cart.emptyCart();
    }
  }

  checkOut() {
    this.onCheckOut.emit();
  }
}
