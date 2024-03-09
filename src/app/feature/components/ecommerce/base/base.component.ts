import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'swtvap-ecommerce-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  lang: string;
  footer: any;
  profile: any;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const { footer, profile, lang } = this.activatedRoute.snapshot.data.process;
    this.profile = profile?.[0] ?? {};
    this.footer = footer?.[0] ?? {};
    this.lang = lang;
  }
}
