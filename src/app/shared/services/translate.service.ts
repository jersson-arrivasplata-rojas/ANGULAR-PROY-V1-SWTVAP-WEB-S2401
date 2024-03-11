import { Injectable } from '@angular/core';
import { TranslateService as NGXTranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root',
})
export class TranslateService {
    constructor(private translate: NGXTranslateService) {
        //translate.setDefaultLang('es');
    }

    switchLanguage(language: string) {
        this.translate.use(language);
    }

    getTranslate(text: string) {
        return this.translate.get(text);
    }

    getOnLangChange() {
        return this.translate.onLangChange;
    }

    getCurrentLang(){
        return this.translate.currentLang || this.translate.getDefaultLang() || localStorage.getItem('lang');
    }
    
}
