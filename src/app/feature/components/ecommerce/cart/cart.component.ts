import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'swtvap-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {

  constructor(private router:Router){ }

  checkout($event){
    this.router.navigate(['/checkout']);
  }
}
