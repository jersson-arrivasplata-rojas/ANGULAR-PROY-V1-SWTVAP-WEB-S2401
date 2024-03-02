import { CommonModule, DecimalPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { EcommerceModule } from './ecommerce/ecommerce.module';


@NgModule({
  declarations: [
  ],
  exports: [],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ComponentsRoutingModule,
    AuthModule,
    AdminModule,
    EcommerceModule,
  ],
  providers: [DecimalPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule { }
