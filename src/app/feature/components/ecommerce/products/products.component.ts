import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'swtvap-ecommerce-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public cartflag: boolean = false;
  public sortBy: string = '';
  public sortOption: string = 'product_name|asc';
  public searchText: string = '';
  public products = [];

  constructor(public cartService: CartService, private router:Router){ }

  ngOnInit() {
    this.ref({ target: { value: '' }});
  }

  ref($event: any) {
    this.cartflag = false;
    setTimeout(() => {
      this.cartflag = true;
    }, 10);
  }

  checkout($event){
    this.router.navigate(['/checkout']);
  }

  goToProduct($event){
    const { product_name } = $event;
    this.router.navigate(['/c/'+product_name]);
  }
}
