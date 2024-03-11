import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, NavigationError, NavigationStart, ResolveEnd, Router } from '@angular/router';
import { slideInAnimation } from './shared/animations/slide-in.animation';
import { LocalService } from './shared/services/local.service';
import { TranslateService } from './shared/services/translate.service';

@Component({
  selector: 'swtvap-angular-proy-v1-swtvap-web-administrator-s2401',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  title = 'ANGULAR-PROY-V1-SWTVAP-WEB-ADMINISTRATOR-S2401';

  loading = false;
  constructor(private router: Router, private translate: TranslateService, private localService: LocalService) {
    const lang = this.localService.getData('lang') || 'es';
    translate.switchLanguage(lang);
    this.localService.saveData('lang', lang);
  }

  ngOnInit(): void {
    console.log('AppComponent ngOnInit');
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationError || event instanceof ResolveEnd) {
        this.loading = false;
      }
    });
  }
}
