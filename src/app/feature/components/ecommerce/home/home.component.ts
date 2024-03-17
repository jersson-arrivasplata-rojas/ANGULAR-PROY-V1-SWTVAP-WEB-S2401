import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from 'src/app/shared/services/translate.service';

@Component({
  selector: 'swtvap-ecommerce-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showEnglishName = false;

  profile: any;
  carrousel: any;
  catalogs: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private translateService:TranslateService) {
  }

  ngOnInit() {
    const { wParameters: { profile, carrousel }, wCatalogs: catalogs } = this.activatedRoute.parent.snapshot.data.process;
    this.profile = profile?.[0] ?? {};
    this.carrousel = carrousel?.[0] ?? {};
    this.catalogs = catalogs;
  }
}
