import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeEnum } from 'src/app/shared/config/home.enum';
import { ShareDataService } from 'src/app/shared/services/share-data.service';

@Component({
  selector: 'swtvap-ecommerce-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
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

  checkout($event) {
    this.router.navigate(['/checkout']);
  }
}
