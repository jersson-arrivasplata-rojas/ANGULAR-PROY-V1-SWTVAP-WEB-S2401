
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeEnum } from 'src/app/shared/config/home.enum';

@Component({
  selector: 'swtvap-ecommerce-ecommerce-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {

  profile: any;
  carrousel: any;
  homeEnum = HomeEnum;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const { wParameters: { profile, carrousel } } = this.activatedRoute.parent.snapshot.data.process;
    this.profile = profile?.[0] ?? {};
    this.carrousel = carrousel?.[0] ?? {};
  }

  continue($event){
    this.router.navigate(['/']);
  }

  buy($event){
    this.router.navigate(['/checkout/billing'])
  }
}
