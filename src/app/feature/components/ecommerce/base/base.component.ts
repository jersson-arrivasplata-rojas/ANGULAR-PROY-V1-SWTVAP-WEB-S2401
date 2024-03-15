import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { slideInAnimation } from 'src/app/shared/animations/slide-in.animation';

@Component({
  selector: 'swtvap-ecommerce-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  animations: [slideInAnimation]
})
export class BaseComponent implements OnInit {
  profile: any;
  hideFooter = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const { wParameters: { profile } } = this.activatedRoute.snapshot.data.process;
    this.profile = profile?.[0] ?? {};

    console.log('AppComponent ngOnInit');
  }

  animationStart() {
    this.hideFooter = true;
  }

  animationDone() {
    this.hideFooter = false;
  }
}