import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'swtvap-ecommerce-politics-and-privacy',
  templateUrl: './politics-and-privacy.component.html',
  styleUrls: ['./politics-and-privacy.component.scss'],
})
export class PoliticsAndPrivacyComponent implements OnInit {

  profile: any;
  carrousel: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const { profile, carrousel } = this.activatedRoute.parent.snapshot.data.process;
    this.profile = profile?.[0] ?? {};
    this.carrousel = carrousel?.[0] ?? {};
  }

  cart($event) {
    this.router.navigate(['/cart']);
  }
}
