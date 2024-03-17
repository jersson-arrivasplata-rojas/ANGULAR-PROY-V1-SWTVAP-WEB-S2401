import { NgModule } from '@angular/core';
import { EcommerceProductResolve } from './ecommerce-product.resolve';
import { EcommerceResolve } from './ecommerce.resolve';
@NgModule({
  imports: [],
  providers: [
    EcommerceResolve,
    EcommerceProductResolve
  ],
})
export class ResolveModule {}
