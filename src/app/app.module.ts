import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { FeatureModule } from './feature/feature.module';
import { BaseComponent } from './feature/components/base/base.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    BrowserModule,
    FeatureModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
