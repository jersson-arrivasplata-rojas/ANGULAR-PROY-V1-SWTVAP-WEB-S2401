import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatureRoutingModule } from './feature-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from './components/components.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeatureRoutingModule,
    SharedModule,
    ComponentsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeatureModule { }
