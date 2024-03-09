import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'swtvap-ecommerce-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  lang: string;
  footer: any;
  profile: any;
  currency: any;
  carrousel: any;
  proposal: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const { footer, profile, currency, carrousel, proposal, lang } = this.activatedRoute.parent.snapshot.data.process;
    this.profile = profile?.[0] ?? {};
    this.currency = currency?.[0] ?? {};
    this.footer = footer?.[0] ?? {};
    this.carrousel = carrousel?.[0] ?? {};
    this.proposal = proposal?.[0] ?? {};
    this.lang = lang;
  }

  cart($event) {
    this.router.navigate(['/cart']);
  }
}
