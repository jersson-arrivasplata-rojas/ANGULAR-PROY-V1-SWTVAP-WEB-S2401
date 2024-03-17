import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { BaseComponent } from './base/base.component';
import { BillingComponent } from './billing/billing.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { EcommerceComponent } from './ecommerce.component';
import { FrequentlyAskedQuestionsComponent } from './frequently-asked-questions/frequently-asked-questions.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PoliticsAndPrivacyComponent } from './politics-and-privacy/politics-and-privacy.component';
import { ProductReturnComponent } from './product-return/product-return.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { ShippingMethodsComponent } from './shipping-methods/shipping-methods.component';


@NgModule({
  declarations: [
    EcommerceComponent,
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
    AboutUsComponent,
    ShippingMethodsComponent,
    CustomerSupportComponent,
    ProductReturnComponent,
    FrequentlyAskedQuestionsComponent,
  ],
  imports: [
    EcommerceRoutingModule,
    CommonModule,
    SharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcommerceModule { }
