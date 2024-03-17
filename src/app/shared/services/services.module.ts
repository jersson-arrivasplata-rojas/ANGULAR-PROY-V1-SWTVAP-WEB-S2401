import { NgModule } from '@angular/core';
import { AnalyticsService } from './analytics.service';
import { CartService } from './cart.service';
import { CurrencyService } from './currency.service';
import { ExampleService } from './example.service';
import { HttpInterceptorService } from './http-interceptor.service';
import { LocalStorageService } from './local-storage.service';
import { LocalService } from './local.service';
import { MessageService } from './message.service';
import { NodeStoreService } from './node-store.service';
import { NodeUserService } from './node-user.service';
import { SeoService } from './seo.service';
import { SlowComponentResolverService } from './slow-component-resolver.service';
import { StorageService } from './storage.service';
import { TokenService } from './token.service';
import { TranslateService } from './translate.service';
import { WindowService } from './window.service';

@NgModule({
  providers: [
    ExampleService,
    LocalStorageService,
    HttpInterceptorService,
    MessageService,
    NodeStoreService,
    NodeUserService,
    SeoService,
    SlowComponentResolverService,
    LocalService,
    WindowService,
    TokenService,
    CartService,
    StorageService,
    TranslateService,
    CurrencyService,
    AnalyticsService,
  ]
})
export class ServicesModule { }
