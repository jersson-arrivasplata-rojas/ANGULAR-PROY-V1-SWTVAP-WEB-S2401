import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { BaseComponent } from './base/base.component';
import { BillingComponent } from './billing/billing.component';
import { CartComponent } from './cart/cart.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CategoryComponent } from './category/category.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';


@NgModule({
  declarations: [
    BaseComponent,
    HomeComponent,
    CatalogComponent,
    CategoryComponent,
    ContactComponent,
    ProductsComponent,
    CartComponent,
    BillingComponent,
    CheckoutComponent,
    ProductComponent,
  ],
  imports: [
    EcommerceRoutingModule,
    CommonModule,
    SharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcommerceModule { }
