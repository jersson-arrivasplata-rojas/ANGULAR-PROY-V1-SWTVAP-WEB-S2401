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

  __allprdts: any = [];
  currentPage = 0;
  displayedProducts = [];

  constructor(public cartService: CartService) { }

  ngOnInit() {
    this.cartService.getProducts().subscribe(data => {
      this.__allprdts = this.cartService.getAllProducts(data);
      this.loadProducts();
    });
    this.__allprdts = this.cartService.allItems;
    this.sortByOption = 'name';
    this.loadProducts();
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
}
/*
loadProducts() {
  const start = (this.currentPage - 1) * 10;
  const end = this.currentPage * 10;
  this.displayedProducts = this.__allprdts.slice(start, end);
}
*/