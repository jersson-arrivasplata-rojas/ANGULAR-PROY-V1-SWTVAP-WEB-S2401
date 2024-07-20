import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcommerceProductResolve } from 'src/app/shared/resolve/ecommerce-product.resolve';
import { EcommerceResolve } from 'src/app/shared/resolve/ecommerce.resolve';
import { AboutUsComponent } from './about-us/about-us.component';
import { BaseComponent } from './base/base.component';
import { BillingComponent } from './billing/billing.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { FrequentlyAskedQuestionsComponent } from './frequently-asked-questions/frequently-asked-questions.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PoliticsAndPrivacyComponent } from './politics-and-privacy/politics-and-privacy.component';
import { ProductReturnComponent } from './product-return/product-return.component';
import { ProductComponent } from './product/product.component';
import { ShippingMethodsComponent } from './shipping-methods/shipping-methods.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      },
      {
        path: 'checkout/billing',
        component: BillingComponent
      },
      {
        path: 'c/:path',
        component: ProductComponent,
        resolve: {
          process: EcommerceProductResolve
        }
      },
      {
        path: 'politics-and-privacy',
        component: PoliticsAndPrivacyComponent
      },
      {
        path: 'about-us',
        component: AboutUsComponent
      },
      {
        path: 'shipping-methods',
        component: ShippingMethodsComponent
      },
      {
        path: 'product-return',
        component: ProductReturnComponent
      },
      {
        path: 'customer-support',
        component: CustomerSupportComponent
      },
      {
        path: 'contact-us',
        component: ContactComponent
      },
      {
        path: 'frequently-asked-questions',
        component: FrequentlyAskedQuestionsComponent
      },
      {
        path: '**', // Esta es la ruta comodín para capturar todas las rutas no definidas
        component: NotFoundComponent, // Redirige a la página no encontrada o a cualquier otro componente
      }
    ],
    resolve: {
      process: EcommerceResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule {}
