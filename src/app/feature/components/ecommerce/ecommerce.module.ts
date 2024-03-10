import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BaseComponent } from './base/base.component';
import { BillingComponent } from './billing/billing.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PoliticsAndPrivacyComponent } from './politics-and-privacy/politics-and-privacy.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';


@NgModule({
  declarations: [
    BaseComponent,
    HomeComponent,
    ContactComponent,
    ProductsComponent,
    CartComponent,
    BillingComponent,
    CheckoutComponent,
    ProductComponent,
    NotFoundComponent,
    PoliticsAndPrivacyComponent,
  ],
  imports: [
    EcommerceRoutingModule,
    CommonModule,
    SharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcommerceModule { }
