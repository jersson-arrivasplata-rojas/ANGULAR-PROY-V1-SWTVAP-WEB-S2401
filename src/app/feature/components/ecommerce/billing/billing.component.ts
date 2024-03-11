import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeEnum } from 'src/app/shared/config/home.enum';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'swtvap-ecommerce-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  profile: any;
  carrousel: any;
  homeEnum = HomeEnum;
  public cartflag = false;

  constructor(public cartService: CartService, private router:Router, private activatedRoute: ActivatedRoute){ }

  ngOnInit(){
    const { profile, carrousel } = this.activatedRoute.parent.snapshot.data.process;
    this.profile = profile?.[0] ?? {};
    this.carrousel = carrousel?.[0] ?? {};
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
