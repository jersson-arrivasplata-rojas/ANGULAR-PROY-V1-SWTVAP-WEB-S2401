import { Component } from '@angular/core';
import { LocalService } from './shared/services/local.service';
import { TranslateService } from './shared/services/translate.service';

@Component({
  selector: 'swtvap-angular-proy-v1-swtvap-web-administrator-s2401',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ANGULAR-PROY-V1-SWTVAP-WEB-ADMINISTRATOR-S2401';
  constructor(private translate: TranslateService, private localService:LocalService) {
    const lang = this.localService.getData('lang') || 'es';
    translate.switchLanguage(lang);
    this.localService.saveData('lang', lang);
  }
}
