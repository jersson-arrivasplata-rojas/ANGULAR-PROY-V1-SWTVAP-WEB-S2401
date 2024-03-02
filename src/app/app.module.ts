import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BaseComponent } from './feature/components/base/base.component';
import { FeatureModule } from './feature/feature.module';
import { ErrorHandlerService } from './shared/errors/error-handler.service';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

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
    HttpClientModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
