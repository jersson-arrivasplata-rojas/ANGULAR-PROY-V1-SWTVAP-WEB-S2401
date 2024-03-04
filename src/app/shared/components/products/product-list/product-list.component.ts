import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'swtvap-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  constructor(public cart: CartService) {}

  @Input('allProductList') __allprdts: any = {};
  @Input('searchedText') __searchedProduct: string = '';
  @Input('sortingBy') sortByOption: string = '';

  @Output() refresh: EventEmitter<any> = new EventEmitter();
  @Output() onProduct: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.sortByOption = 'product_name';
  }
  addToCart(productId, productQty, productSize?) {
    this.cart.allItems = this.__allprdts;
    this.cart.addToCart(productId, productQty, '');
    this.refresh.emit(true);
  }

  goToProduct(item){
    this.onProduct.emit(item);
  }
}
