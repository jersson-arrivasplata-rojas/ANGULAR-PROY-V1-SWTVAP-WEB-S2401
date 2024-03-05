
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'swtvap-ecommerce-ecommerce-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {

  constructor(private router:Router){}

  continue($event){
    this.router.navigate(['/']);
  }

  buy($event){
    this.router.navigate(['/checkout/billing'])
  }
}
