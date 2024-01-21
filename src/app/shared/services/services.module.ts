import { NgModule } from '@angular/core';
import { ExampleService } from './example.service';
import { HttpInterceptorService } from './http-interceptor.service';
import { LocalStorageService } from './local-storage.service';
import { MessageService } from './message.service';
import { NodeStoreService } from './node-store.service';
import { NodeUserService } from './node-user.service';
import { SeoService } from './seo.service';
import { SlowComponentResolverService } from './slow-component-resolver.service';

@NgModule({
  providers: [
    ExampleService,
    LocalStorageService,
    HttpInterceptorService,
    MessageService,
    NodeStoreService,
    NodeUserService,
    SeoService,
    SlowComponentResolverService
  ]
})
export class ServicesModule { }
