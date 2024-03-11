import { Component } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'swtvap-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.scss'],
})
export class CheckoutCartComponent {

  constructor(public cartService: CartService) {}

  getTotal(){
    const total = this.cartService.cartItemsList.reduce((acc, item) => acc + (item.price * item.qty), 0);
    return total;
  }
}
