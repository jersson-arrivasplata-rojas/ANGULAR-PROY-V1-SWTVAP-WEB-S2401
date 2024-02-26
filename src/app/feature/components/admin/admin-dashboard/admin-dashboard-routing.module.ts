import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardAnalyticsComponent } from './admin-dashboard-analytics/admin-dashboard-analytics.component';
import { AdminDashboardBaseComponent } from './admin-dashboard-base/admin-dashboard-base.component';
import { AdminDashboardCatalogsCategoriesComponent } from './admin-dashboard-catalogs-categories/admin-dashboard-catalogs-categories.component';
import { AdminDashboardCatalogsComponent } from './admin-dashboard-catalogs/admin-dashboard-catalogs.component';
import { AdminDashboardCategoriesProductsComponent } from './admin-dashboard-categories-products/admin-dashboard-categories-products.component';
import { AdminDashboardCategoriesComponent } from './admin-dashboard-categories/admin-dashboard-categories.component';
import { AdminDashboardClientsComponent } from './admin-dashboard-clients/admin-dashboard-clients.component';
import { AdminDashboardCommentsComponent } from './admin-dashboard-comments/admin-dashboard-comments.component';
import { AdminDashboardHomeComponent } from './admin-dashboard-home/admin-dashboard-home.component';
import { AdminDashboardMarketingCampaignsComponent } from './admin-dashboard-marketing-campaigns/admin-dashboard-marketing-campaigns.component';
import { AdminDashboardOrdersAmountsComponent } from './admin-dashboard-orders-amounts/admin-dashboard-orders-amounts.component';
import { AdminDashboardOrdersClientsComponent } from './admin-dashboard-orders-clients/admin-dashboard-orders-clients.component';
import { AdminDashboardOrdersDetailsComponent } from './admin-dashboard-orders-details/admin-dashboard-orders-details.component';
import { AdminDashboardOrdersDispatchesProvidersComponent } from './admin-dashboard-orders-dispatches-providers/admin-dashboard-orders-dispatches-providers.component';
import { AdminDashboardOrdersDispatchesComponent } from './admin-dashboard-orders-dispatches/admin-dashboard-orders-dispatches.component';
import { AdminDashboardOrdersTransactionsComponent } from './admin-dashboard-orders-transactions/admin-dashboard-orders-transactions.component';
import { AdminDashboardOrdersComponent } from './admin-dashboard-orders/admin-dashboard-orders.component';
import { AdminDashboardParametersComponent } from './admin-dashboard-parameters/admin-dashboard-parameters.component';
import { AdminDashboardProductsDiscountsComponent } from './admin-dashboard-products-discounts/admin-dashboard-products-discounts.component';
import { AdminDashboardProductsImagesComponent } from './admin-dashboard-products-images/admin-dashboard-products-images.component';
import { AdminDashboardProductsParametersComponent } from './admin-dashboard-products-parameters/admin-dashboard-products-parameters.component';
import { AdminDashboardProductsSubParametersComponent } from './admin-dashboard-products-sub-parameters/admin-dashboard-products-sub-parameters.component';
import { AdminDashboardProductsSubTertiaryParametersComponent } from './admin-dashboard-products-sub-tertiary-parameters/admin-dashboard-products-sub-tertiary-parameters.component';
import { AdminDashboardProductsComponent } from './admin-dashboard-products/admin-dashboard-products.component';
import { AdminDashboardProvidersProductsComponent } from './admin-dashboard-providers-products/admin-dashboard-providers-products.component';
import { AdminDashboardProvidersComponent } from './admin-dashboard-providers/admin-dashboard-providers.component';
import { AdminDashboardSubParametersComponent } from './admin-dashboard-sub-parameters/admin-dashboard-sub-parameters.component';
import { AdminDashboardSubSecondaryParametersComponent } from './admin-dashboard-sub-secondary-parameters/admin-dashboard-sub-secondary-parameters.component';
import { AdminDashboardSubTertiaryParametersComponent } from './admin-dashboard-sub-tertiary-parameters/admin-dashboard-sub-tertiary-parameters.component';
import { AdminDashboardSubscriptionsComponent } from './admin-dashboard-subscriptions/admin-dashboard-subscriptions.component';
import { AdminDashboardUnitsProductsComponent } from './admin-dashboard-units-products/admin-dashboard-units-products.component';
import { AdminDashboardUnitsComponent } from './admin-dashboard-units/admin-dashboard-units.component';

const routes: Routes =  [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',//dashboard
    component: AdminDashboardBaseComponent,
    // canActivateChild: [AdminGuard],
    children: [
      {
        path: 'home',
        component: AdminDashboardHomeComponent
      },
      {
        path: 'catalogs',
        component: AdminDashboardCatalogsComponent
      },
      {
        path: 'catalogs/add/:id',
        component: AdminDashboardCatalogsCategoriesComponent
      },
      {
        path: 'categories',
        component: AdminDashboardCategoriesComponent
      },
      {
        path: 'categories/add/:id',
        component: AdminDashboardCatalogsCategoriesComponent
      },
      {
        path: 'categories/add-products/:id',
        component: AdminDashboardCategoriesProductsComponent
      },
      {
        path: 'units',
        component: AdminDashboardUnitsComponent
      },
      {
        path: 'clients',
        component: AdminDashboardClientsComponent
      },
      {
        path: 'providers',
        component: AdminDashboardProvidersComponent
      },
      {
        path: 'analytics',
        component: AdminDashboardAnalyticsComponent
      },
      {
        path: 'marketing-campaigns',
        component: AdminDashboardMarketingCampaignsComponent
      },
      {
        path: 'newsletter-subscriptions',
        component: AdminDashboardSubscriptionsComponent
      },
      {
        path: 'parameters',
        component: AdminDashboardParametersComponent
      },
      {
        path: 'parameters/add/:id',
        component: AdminDashboardSubParametersComponent
      },
      {
        path: 'parameters/add/:id/add-secondary/:idSubParameter',
        component: AdminDashboardSubSecondaryParametersComponent
      },
      {
        path: 'parameters/add/:id/add-secondary/:idSubParameter/add-tertiary/:idSubSecondaryParameter',
        component: AdminDashboardSubTertiaryParametersComponent
      },
      {
        path: 'products',
        component: AdminDashboardProductsComponent
      },
      {
        path: 'products/add-categories/:id',
        component: AdminDashboardCategoriesProductsComponent
      },
      {
        path: 'products/add-units/:id',
        component: AdminDashboardUnitsProductsComponent
      },
      {
        path: 'products/add-providers/:id',
        component: AdminDashboardProvidersProductsComponent
      },
      {
        path: 'products/add-discounts/:id',
        component: AdminDashboardProductsDiscountsComponent
      },
      {
        path: 'products/add-images/:id',
        component: AdminDashboardProductsImagesComponent
      },
      {
        path: 'products/add-parameters/:id',
        component: AdminDashboardProductsParametersComponent
      },
      {
        path: 'products/add-comments/:id',
        component: AdminDashboardCommentsComponent
      },
      {
        path: 'products/add-parameters/:id/parameters/:idParameter/add-secondary/:idSubParameter',
        component: AdminDashboardProductsSubParametersComponent
      },
      {
        path: 'products/add-parameters/:id/parameters/:idParameter/add-secondary/:idSubParameter/add-tertiary/:idSubSecondaryParameter',
        component: AdminDashboardProductsSubTertiaryParametersComponent
      },
      {
        path: 'orders',
        component: AdminDashboardOrdersComponent
      },
      {
        path: 'orders/add-client/:id',
        component: AdminDashboardOrdersClientsComponent
      },
      {
        path: 'orders/add-amounts/:id',
        component: AdminDashboardOrdersAmountsComponent
      },
      {
        path: 'orders/add-details/:id',
        component: AdminDashboardOrdersDetailsComponent
      },
      {
        path: 'orders/add-transactions/:id',
        component: AdminDashboardOrdersTransactionsComponent
      },
      {
        path: 'orders/add-dispatches/:id',
        component: AdminDashboardOrdersDispatchesComponent
      },
      {
        path: 'orders/add-dispatches/:id/add-providers/:idDispatch',
        component: AdminDashboardOrdersDispatchesProvidersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
