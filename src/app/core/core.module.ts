import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './components/layout/navbar/navbar.component';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    [NavbarComponent]
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
