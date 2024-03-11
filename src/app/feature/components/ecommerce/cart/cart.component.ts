import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeEnum } from 'src/app/shared/config/home.enum';

@Component({
  selector: 'swtvap-ecommerce-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  profile: any;
  carrousel: any;
  homeEnum = HomeEnum;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const { profile, carrousel } = this.activatedRoute.parent.snapshot.data.process;
    this.profile = profile?.[0] ?? {};
    this.carrousel = carrousel?.[0] ?? {};
  }

  checkout($event) {
    this.router.navigate(['/checkout']);
  }
}
