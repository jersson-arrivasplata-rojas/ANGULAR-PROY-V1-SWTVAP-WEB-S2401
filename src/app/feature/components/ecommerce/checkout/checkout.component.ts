
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeEnum } from 'src/app/shared/config/home.enum';
import { ShareDataService } from 'src/app/shared/services/share-data.service';

@Component({
  selector: 'swtvap-ecommerce-ecommerce-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {

  lang: string;
  profile: any;
  currency: any;
  carrousel: any;
  homeEnum = HomeEnum;

  constructor(private router: Router, private shareDataService: ShareDataService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const { profile, currency, carrousel, lang } = this.activatedRoute.parent.snapshot.data.process;
    this.profile = profile?.[0] ?? {};
    this.currency = currency?.[0] ?? {};
    this.carrousel = carrousel?.[0] ?? {};
    this.lang = lang;
  }

  continue($event){
    this.router.navigate(['/']);
  }

  buy($event){
    this.router.navigate(['/checkout/billing'])
  }
}
