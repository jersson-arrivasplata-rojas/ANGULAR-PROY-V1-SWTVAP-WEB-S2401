import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { ComponentsRoutingModule } from './components-routing.module';


@NgModule({
  declarations: [
  ],
  exports: [],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AuthModule,
    ComponentsRoutingModule
  ],
  providers: [DecimalPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule { }
