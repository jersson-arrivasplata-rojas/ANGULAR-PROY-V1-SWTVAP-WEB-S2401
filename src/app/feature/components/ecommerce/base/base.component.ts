import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'swtvap-ecommerce-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  profile: any;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const { profile} = this.activatedRoute.snapshot.data.process;
    this.profile = profile?.[0] ?? {};
  }
}
