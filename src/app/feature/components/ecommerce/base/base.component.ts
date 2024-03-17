import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { slideInAnimation } from 'src/app/shared/animations/slide-in.animation';
import { EcommerceWhiteEnum } from 'src/app/shared/config/ecommerce-routes-white.enum';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'swtvap-ecommerce-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  animations: [slideInAnimation]
})
export class BaseComponent implements OnInit {
  profile: any;
  hideFooter = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    const { wParameters: { profile } } = this.activatedRoute.snapshot.data.process;
    this.profile = profile?.[0] ?? {};

    const baseUrlHash = CommonUtils.getBaseUrlHash();
    if (Object.values(EcommerceWhiteEnum).some(route => baseUrlHash === route && route !== EcommerceWhiteEnum.NOT_FOUND)) {
      this.analyticsService.sendForAnalytics(baseUrlHash);
    }
    // Enviar la URL actual al servicio de análisis cuando la aplicación se carga por primera vez

    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (Object.values(EcommerceWhiteEnum).some(route => event.urlAfterRedirects === route)) {
        this.analyticsService.sendForAnalytics(event.urlAfterRedirects);
      }
    });
  }

  animationStart() {
    this.hideFooter = true;
  }

  animationDone() {
    this.hideFooter = false;
  }
}