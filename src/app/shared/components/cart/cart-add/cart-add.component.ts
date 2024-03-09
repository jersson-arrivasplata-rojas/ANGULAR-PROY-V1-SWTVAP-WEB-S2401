import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'swtvap-cart-add',
  templateUrl: './cart-add.component.html',
  styleUrls: ['./cart-add.component.scss'],
})
export class CartAddComponent implements OnInit {
  @Output() onCheckOut: EventEmitter<any> = new EventEmitter();
  @Input() showProduct = false;

  constructor(public cart: CartService) {}

  ngOnInit(): void {
    console.log(this.cart.cartItemsList);
  }

  removeItem(pid){
    this.cart.removeItem(pid);
  }

  changeQty(pid, qty, replace) {
    if (qty !== '') {
      qty = parseInt(qty) || 1;
      this.cart.addToCart(pid, qty, replace);
    } else {
      this.cart.addToCart(pid, 1, replace);
    }
  }

  async emptyCart() {
    let text = 'Are you sure you want to clear the cart ?';
    //let text = '¡Presiona el bot\xf3n para limpiar todo el carrito!';

    if (await confirm(text) === true) {
      this.cart.emptyCart();
      (window as any).success('¡Limpiado!');
    }
  }

  checkOut() {
    this.onCheckOut.emit();
  }
}
