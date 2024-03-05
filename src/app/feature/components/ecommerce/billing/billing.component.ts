import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { productInitFN } from 'src/app/shared/functions/product.init.function';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'swtvap-ecommerce-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  public products = productInitFN();
  public cartflag = false;
  
  constructor(public cart: CartService, private router:Router){ }

  ngOnInit(){
    this.ref();
  }

  ref(){
    this.cartflag = false;
    setTimeout( () => {
        this.cartflag = true;
    }, 1000 )
  }

  continue($event){
    this.router.navigate(['/']);
  }

  billing($event){
    this.router.navigate(['/checkout/billing']);
  }
}
