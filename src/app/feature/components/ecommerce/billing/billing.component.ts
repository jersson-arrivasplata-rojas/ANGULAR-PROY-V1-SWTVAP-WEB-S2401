import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeEnum } from 'src/app/shared/config/home.enum';
import { productInitFN } from 'src/app/shared/functions/product.init.function';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'swtvap-ecommerce-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  lang: string;
  profile: any;
  currency: any;
  carrousel: any;
  homeEnum = HomeEnum;

  public products = productInitFN();
  public cartflag = false;

  constructor(public cart: CartService, private router:Router, private activatedRoute: ActivatedRoute){ }

  ngOnInit(){
    const { profile, currency, carrousel, lang } = this.activatedRoute.parent.snapshot.data.process;
    this.profile = profile?.[0] ?? {};
    this.currency = currency?.[0] ?? {};
    this.carrousel = carrousel?.[0] ?? {};
    this.lang = lang;
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
