import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'swtvap-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  @Input('searchedText') __searchedProduct: string = '';
  @Input('sortingBy') sortByOption: string = '';

  @Output() refresh: EventEmitter<any> = new EventEmitter();
  @Output() onProduct: EventEmitter<any> = new EventEmitter();

  __allprdts:any = [];

  constructor(public cartService: CartService) {}

  ngOnInit() {
    this.__allprdts = this.cartService.allItems;
    this.sortByOption = 'product_name';
  }

  addToCart(productId, productQty, productSize?) {
    this.cartService.addToCart(productId, productQty, '');
    this.refresh.emit(true);
  }

  goToProduct(item){
    this.onProduct.emit(item);
  }
}
