import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BaseComponent } from './feature/components/base/base.component';
import { FeatureModule } from './feature/feature.module';

registerLocaleData(localeEs);
@NgModule({
  declarations: [
    AppComponent,
    BaseComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FeatureModule,
    CoreModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
