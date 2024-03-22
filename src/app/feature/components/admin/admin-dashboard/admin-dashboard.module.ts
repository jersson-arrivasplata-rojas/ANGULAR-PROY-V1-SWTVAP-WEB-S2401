import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LaddaModule } from 'angular2-ladda';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminDashboardAnalyticsComponent } from './admin-dashboard-analytics/admin-dashboard-analytics.component';
import { ComponentAddAnalyticsComponent } from './admin-dashboard-analytics/component-add-analytics/component-add-analytics.component';
import { ComponentListAnalyticsComponent } from './admin-dashboard-analytics/component-list-analytics/component-list-analytics.component';
import { ComponentShowAnalyticsComponent } from './admin-dashboard-analytics/component-show-analytics/component-show-analytics.component';
import { ComponentUpdateAnalyticsComponent } from './admin-dashboard-analytics/component-update-analytics/component-update-analytics.component';
import { AdminDashboardBaseComponent } from './admin-dashboard-base/admin-dashboard-base.component';
import { AdminDashboardCatalogsCategoriesComponent } from './admin-dashboard-catalogs-categories/admin-dashboard-catalogs-categories.component';
import { ComponentListCatalogsCategoriesComponent } from './admin-dashboard-catalogs-categories/component-list-catalogs-categories/component-list-catalogs-categories.component';
import { ComponentShowCatalogsCategoriesComponent } from './admin-dashboard-catalogs-categories/component-show-catalogs-categories/component-show-catalogs-categories.component';
import { AdminDashboardCatalogsProductsComponent } from './admin-dashboard-catalogs-products/admin-dashboard-catalogs-products.component';
import { ComponentListCatalogsProductsComponent } from './admin-dashboard-catalogs-products/component-list-catalogs-products/component-list-catalogs-products.component';
import { ComponentShowCatalogsProductsComponent } from './admin-dashboard-catalogs-products/component-show-catalogs-products/component-show-catalogs-products.component';
import { AdminDashboardCatalogsComponent } from './admin-dashboard-catalogs/admin-dashboard-catalogs.component';
import { ComponentAddCatalogsComponent } from './admin-dashboard-catalogs/component-add-catalogs/component-add-catalogs.component';
import { ComponentListCatalogsComponent } from './admin-dashboard-catalogs/component-list-catalogs/component-list-catalogs.component';
import { ComponentShowCatalogsComponent } from './admin-dashboard-catalogs/component-show-catalogs/component-show-catalogs.component';
import { ComponentUpdateCatalogsComponent } from './admin-dashboard-catalogs/component-update-catalogs/component-update-catalogs.component';
import { AdminDashboardCategoriesProductsComponent } from './admin-dashboard-categories-products/admin-dashboard-categories-products.component';
import { ComponentListCategoriesProductsComponent } from './admin-dashboard-categories-products/component-list-categories-products/component-list-categories-products.component';
import { ComponentShowCategoriesProductsComponent } from './admin-dashboard-categories-products/component-show-categories-products/component-show-categories-products.component';
import { AdminDashboardCategoriesComponent } from './admin-dashboard-categories/admin-dashboard-categories.component';
import { ComponentAddCategoriesComponent } from './admin-dashboard-categories/component-add-categories/component-add-categories.component';
import { ComponentListCategoriesComponent } from './admin-dashboard-categories/component-list-categories/component-list-categories.component';
import { ComponentShowCategoriesComponent } from './admin-dashboard-categories/component-show-categories/component-show-categories.component';
import { ComponentUpdateCategoriesComponent } from './admin-dashboard-categories/component-update-categories/component-update-categories.component';
import { AdminDashboardClientsComponent } from './admin-dashboard-clients/admin-dashboard-clients.component';
import { ComponentAddClientsComponent } from './admin-dashboard-clients/component-add-clients/component-add-clients.component';
import { ComponentListClientsComponent } from './admin-dashboard-clients/component-list-clients/component-list-clients.component';
import { ComponentShowClientsComponent } from './admin-dashboard-clients/component-show-clients/component-show-clients.component';
import { ComponentUpdateClientsComponent } from './admin-dashboard-clients/component-update-clients/component-update-clients.component';
import { AdminDashboardCommentsComponent } from './admin-dashboard-comments/admin-dashboard-comments.component';
import { ComponentListCommentsComponent } from './admin-dashboard-comments/component-list-comments/component-list-comments.component';
import { AdminDashboardContactsComponent } from './admin-dashboard-contacts/admin-dashboard-contacts.component';
import { ComponentAddContactsComponent } from './admin-dashboard-contacts/component-add-contacts/component-add-contacts.component';
import { ComponentListContactsComponent } from './admin-dashboard-contacts/component-list-contacts/component-list-contacts.component';
import { ComponentShowContactsComponent } from './admin-dashboard-contacts/component-show-contacts/component-show-contacts.component';
import { ComponentUpdateContactsComponent } from './admin-dashboard-contacts/component-update-contacts/component-update-contacts.component';
import { AdminDashboardHomeComponent } from './admin-dashboard-home/admin-dashboard-home.component';
import { AdminDashboardMarketingCampaignsComponent } from './admin-dashboard-marketing-campaigns/admin-dashboard-marketing-campaigns.component';
import { ComponentAddMarketingCampaignsComponent } from './admin-dashboard-marketing-campaigns/component-add-marketing-campaigns/component-add-marketing-campaigns.component';
import { ComponentListMarketingCampaignsComponent } from './admin-dashboard-marketing-campaigns/component-list-marketing-campaigns/component-list-marketing-campaigns.component';
import { ComponentShowMarketingCampaignsComponent } from './admin-dashboard-marketing-campaigns/component-show-marketing-campaigns/component-show-marketing-campaigns.component';
import { ComponentUpdateMarketingCampaignsComponent } from './admin-dashboard-marketing-campaigns/component-update-marketing-campaigns/component-update-marketing-campaigns.component';
import { AdminDashboardOrdersAmountsComponent } from './admin-dashboard-orders-amounts/admin-dashboard-orders-amounts.component';
import { ComponentAddOrdersAmountsComponent } from './admin-dashboard-orders-amounts/component-add-orders-amounts/component-add-orders-amounts.component';
import { ComponentListOrdersAmountsComponent } from './admin-dashboard-orders-amounts/component-list-orders-amounts/component-list-orders-amounts.component';
import { ComponentShowOrdersAmountsComponent } from './admin-dashboard-orders-amounts/component-show-orders-amounts/component-show-orders-amounts.component';
import { ComponentUpdateOrdersAmountsComponent } from './admin-dashboard-orders-amounts/component-update-orders-amounts/component-update-orders-amounts.component';
import { AdminDashboardOrdersClientsComponent } from './admin-dashboard-orders-clients/admin-dashboard-orders-clients.component';
import { ComponentListOrdersClientsComponent } from './admin-dashboard-orders-clients/component-list-orders-clients/component-list-orders-clients.component';
import { ComponentShowOrdersClientsComponent } from './admin-dashboard-orders-clients/component-show-orders-clients/component-show-orders-clients.component';
import { AdminDashboardOrdersDetailsComponent } from './admin-dashboard-orders-details/admin-dashboard-orders-details.component';
import { ComponentAddOrdersDetailsComponent } from './admin-dashboard-orders-details/component-add-orders-details/component-add-orders-details.component';
import { ComponentListOrdersDetailsProductsComponent } from './admin-dashboard-orders-details/component-list-orders-details-products/component-list-orders-details-products.component';
import { ComponentListOrdersDetailsComponent } from './admin-dashboard-orders-details/component-list-orders-details/component-list-orders-details.component';
import { ComponentShowOrdersDetailsComponent } from './admin-dashboard-orders-details/component-show-orders-details/component-show-orders-details.component';
import { ComponentUpdateOrdersDetailsComponent } from './admin-dashboard-orders-details/component-update-orders-details/component-update-orders-details.component';
import { AdminDashboardOrdersDispatchesProvidersComponent } from './admin-dashboard-orders-dispatches-providers/admin-dashboard-orders-dispatches-providers.component';
import { ComponentListOrdersDispatchesProvidersComponent } from './admin-dashboard-orders-dispatches-providers/component-list-orders-dispatches-providers/component-list-orders-dispatches-providers.component';
import { ComponentShowOrdersDispatchesProvidersComponent } from './admin-dashboard-orders-dispatches-providers/component-show-orders-dispatches-providers/component-show-orders-dispatches-providers.component';
import { AdminDashboardOrdersDispatchesComponent } from './admin-dashboard-orders-dispatches/admin-dashboard-orders-dispatches.component';
import { ComponentAddOrdersDispatchesComponent } from './admin-dashboard-orders-dispatches/component-add-orders-dispatches/component-add-orders-dispatches.component';
import { ComponentListOrdersDispatchesComponent } from './admin-dashboard-orders-dispatches/component-list-orders-dispatches/component-list-orders-dispatches.component';
import { ComponentShowOrdersDispatchesComponent } from './admin-dashboard-orders-dispatches/component-show-orders-dispatches/component-show-orders-dispatches.component';
import { ComponentUpdateOrdersDispatchesComponent } from './admin-dashboard-orders-dispatches/component-update-orders-dispatches/component-update-orders-dispatches.component';
import { AdminDashboardOrdersTransactionsComponent } from './admin-dashboard-orders-transactions/admin-dashboard-orders-transactions.component';
import { ComponentAddOrdersTransactionsComponent } from './admin-dashboard-orders-transactions/component-add-orders-transactions/component-add-orders-transactions.component';
import { ComponentListOrdersTransactionsComponent } from './admin-dashboard-orders-transactions/component-list-orders-transactions/component-list-orders-transactions.component';
import { ComponentShowOrdersTransactionsComponent } from './admin-dashboard-orders-transactions/component-show-orders-transactions/component-show-orders-transactions.component';
import { ComponentUpdateOrdersTransactionsComponent } from './admin-dashboard-orders-transactions/component-update-orders-transactions/component-update-orders-transactions.component';
import { AdminDashboardOrdersComponent } from './admin-dashboard-orders/admin-dashboard-orders.component';
import { ComponentAddOrdersComponent } from './admin-dashboard-orders/component-add-orders/component-add-orders.component';
import { ComponentListOrdersComponent } from './admin-dashboard-orders/component-list-orders/component-list-orders.component';
import { ComponentShowOrdersComponent } from './admin-dashboard-orders/component-show-orders/component-show-orders.component';
import { ComponentUpdateOrdersComponent } from './admin-dashboard-orders/component-update-orders/component-update-orders.component';
import { AdminDashboardParametersComponent } from './admin-dashboard-parameters/admin-dashboard-parameters.component';
import { ComponentAddParametersComponent } from './admin-dashboard-parameters/component-add-parameters/component-add-parameters.component';
import { ComponentListParametersComponent } from './admin-dashboard-parameters/component-list-parameters/component-list-parameters.component';
import { ComponentShowParametersComponent } from './admin-dashboard-parameters/component-show-parameters/component-show-parameters.component';
import { ComponentUpdateParametersComponent } from './admin-dashboard-parameters/component-update-parameters/component-update-parameters.component';
import { AdminDashboardProductsDiscountsComponent } from './admin-dashboard-products-discounts/admin-dashboard-products-discounts.component';
import { ComponentAddProductsDiscountsComponent } from './admin-dashboard-products-discounts/component-add-products-discounts/component-add-products-discounts.component';
import { ComponentListProductsDiscountsComponent } from './admin-dashboard-products-discounts/component-list-products-discounts/component-list-products-discounts.component';
import { ComponentShowProductsDiscountsComponent } from './admin-dashboard-products-discounts/component-show-products-discounts/component-show-products-discounts.component';
import { ComponentUpdateProductsDiscountsComponent } from './admin-dashboard-products-discounts/component-update-products-discounts/component-update-products-discounts.component';
import { AdminDashboardProductsImagesComponent } from './admin-dashboard-products-images/admin-dashboard-products-images.component';
import { ComponentAddProductsImagesComponent } from './admin-dashboard-products-images/component-add-products-images/component-add-products-images.component';
import { ComponentListProductsImagesComponent } from './admin-dashboard-products-images/component-list-products-images/component-list-products-images.component';
import { ComponentShowProductsImagesComponent } from './admin-dashboard-products-images/component-show-products-images/component-show-products-images.component';
import { ComponentUpdateProductsImagesComponent } from './admin-dashboard-products-images/component-update-products-images/component-update-products-images.component';
import { AdminDashboardProductsParametersComponent } from './admin-dashboard-products-parameters/admin-dashboard-products-parameters.component';
import { ComponentAddProductsParametersComponent } from './admin-dashboard-products-parameters/component-add-products-parameters/component-add-products-parameters.component';
import { ComponentListProductsParametersProductsComponent } from './admin-dashboard-products-parameters/component-list-product-parameters-products/component-list-product-parameters-products.component';
import { ComponentListProductsParametersComponent } from './admin-dashboard-products-parameters/component-list-products-parameters/component-list-products-parameters.component';
import { ComponentShowProductsParametersComponent } from './admin-dashboard-products-parameters/component-show-products-parameters/component-show-products-parameters.component';
import { AdminDashboardProductsSubParametersComponent } from './admin-dashboard-products-sub-parameters/admin-dashboard-products-sub-parameters.component';
import { ComponentAddProductsSubParametersComponent } from './admin-dashboard-products-sub-parameters/component-add-products-sub-parameters/component-add-products-sub-parameters.component';
import { ComponentListProductsSubParametersComponent } from './admin-dashboard-products-sub-parameters/component-list-products-sub-parameters/component-list-products-sub-parameters.component';
import { ComponentShowProductsSubParametersComponent } from './admin-dashboard-products-sub-parameters/component-show-products-sub-parameters/component-show-products-sub-parameters.component';
import { ComponentUpdateProductsSubParametersComponent } from './admin-dashboard-products-sub-parameters/component-update-products-sub-parameters/component-update-products-sub-parameters.component';
import { AdminDashboardProductsSubTertiaryParametersComponent } from './admin-dashboard-products-sub-tertiary-parameters/admin-dashboard-products-sub-tertiary-parameters.component';
import { ComponentAddProductsSubTertiaryParametersComponent } from './admin-dashboard-products-sub-tertiary-parameters/component-add-products-sub-tertiary-parameters/component-add-products-sub-tertiary-parameters.component';
import { ComponentListProductsSubTertiaryParametersComponent } from './admin-dashboard-products-sub-tertiary-parameters/component-list-products-sub-tertiary-parameters/component-list-products-sub-tertiary-parameters.component';
import { ComponentShowProductsSubTertiaryParametersComponent } from './admin-dashboard-products-sub-tertiary-parameters/component-show-products-sub-tertiary-parameters/component-show-products-sub-tertiary-parameters.component';
import { ComponentUpdateProductsSubTertiaryParametersComponent } from './admin-dashboard-products-sub-tertiary-parameters/component-update-products-sub-tertiary-parameters/component-update-products-sub-tertiary-parameters.component';
import { AdminDashboardProductsComponent } from './admin-dashboard-products/admin-dashboard-products.component';
import { ComponentAddProductsComponent } from './admin-dashboard-products/component-add-products/component-add-products.component';
import { ComponentListProductsComponent } from './admin-dashboard-products/component-list-products/component-list-products.component';
import { ComponentShowProductsComponent } from './admin-dashboard-products/component-show-products/component-show-products.component';
import { ComponentUpdateProductsComponent } from './admin-dashboard-products/component-update-products/component-update-products.component';
import { AdminDashboardProvidersProductsComponent } from './admin-dashboard-providers-products/admin-dashboard-providers-products.component';
import { ComponentListProvidersProductsComponent } from './admin-dashboard-providers-products/component-list-providers-products/component-list-providers-products.component';
import { ComponentShowProvidersProductsComponent } from './admin-dashboard-providers-products/component-show-providers-products/component-show-providers-products.component';
import { AdminDashboardProvidersComponent } from './admin-dashboard-providers/admin-dashboard-providers.component';
import { ComponentAddProvidersComponent } from './admin-dashboard-providers/component-add-providers/component-add-providers.component';
import { ComponentListProvidersComponent } from './admin-dashboard-providers/component-list-providers/component-list-providers.component';
import { ComponentShowProvidersComponent } from './admin-dashboard-providers/component-show-providers/component-show-providers.component';
import { ComponentUpdateProvidersComponent } from './admin-dashboard-providers/component-update-providers/component-update-providers.component';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardSubParametersComponent } from './admin-dashboard-sub-parameters/admin-dashboard-sub-parameters.component';
import { ComponentAddSubParametersComponent } from './admin-dashboard-sub-parameters/component-add-sub-parameters/component-add-sub-parameters.component';
import { ComponentListSubParametersComponent } from './admin-dashboard-sub-parameters/component-list-sub-parameters/component-list-sub-parameters.component';
import { ComponentShowSubParametersComponent } from './admin-dashboard-sub-parameters/component-show-sub-parameters/component-show-sub-parameters.component';
import { ComponentUpdateSubParametersComponent } from './admin-dashboard-sub-parameters/component-update-sub-parameters/component-update-sub-parameters.component';
import { AdminDashboardSubSecondaryParametersComponent } from './admin-dashboard-sub-secondary-parameters/admin-dashboard-sub-secondary-parameters.component';
import { ComponentAddSubSecondaryParametersComponent } from './admin-dashboard-sub-secondary-parameters/component-add-sub-secondary-parameters/component-add-sub-secondary-parameters.component';
import { ComponentListSubSecondaryParametersComponent } from './admin-dashboard-sub-secondary-parameters/component-list-sub-secondary-parameters/component-list-sub-secondary-parameters.component';
import { ComponentShowSubSecondaryParametersComponent } from './admin-dashboard-sub-secondary-parameters/component-show-sub-secondary-parameters/component-show-sub-secondary-parameters.component';
import { ComponentUpdateSubSecondaryParametersComponent } from './admin-dashboard-sub-secondary-parameters/component-update-sub-secondary-parameters/component-update-sub-secondary-parameters.component';
import { AdminDashboardSubTertiaryParametersComponent } from './admin-dashboard-sub-tertiary-parameters/admin-dashboard-sub-tertiary-parameters.component';
import { ComponentAddSubTertiaryParametersComponent } from './admin-dashboard-sub-tertiary-parameters/component-add-sub-tertiary-parameters/component-add-sub-tertiary-parameters.component';
import { ComponentListSubTertiaryParametersComponent } from './admin-dashboard-sub-tertiary-parameters/component-list-sub-tertiary-parameters/component-list-sub-tertiary-parameters.component';
import { ComponentShowSubTertiaryParametersComponent } from './admin-dashboard-sub-tertiary-parameters/component-show-sub-tertiary-parameters/component-show-sub-tertiary-parameters.component';
import { ComponentUpdateSubTertiaryParametersComponent } from './admin-dashboard-sub-tertiary-parameters/component-update-sub-tertiary-parameters/component-update-sub-tertiary-parameters.component';
import { AdminDashboardSubscriptionsComponent } from './admin-dashboard-subscriptions/admin-dashboard-subscriptions.component';
import { ComponentAddSubscriptionsComponent } from './admin-dashboard-subscriptions/component-add-subscriptions/component-add-subscriptions.component';
import { ComponentListSubscriptionsComponent } from './admin-dashboard-subscriptions/component-list-subscriptions/component-list-subscriptions.component';
import { ComponentShowSubscriptionsComponent } from './admin-dashboard-subscriptions/component-show-subscriptions/component-show-subscriptions.component';
import { ComponentUpdateSubscriptionsComponent } from './admin-dashboard-subscriptions/component-update-subscriptions/component-update-subscriptions.component';
import { AdminDashboardUnitsProductsComponent } from './admin-dashboard-units-products/admin-dashboard-units-products.component';
import { ComponentListUnitsProductsComponent } from './admin-dashboard-units-products/component-list-units-products/component-list-units-products.component';
import { ComponentShowUnitsProductsComponent } from './admin-dashboard-units-products/component-show-units-products/component-show-units-products.component';
import { AdminDashboardUnitsComponent } from './admin-dashboard-units/admin-dashboard-units.component';
import { ComponentAddUnitsComponent } from './admin-dashboard-units/component-add-units/component-add-units.component';
import { ComponentListUnitsComponent } from './admin-dashboard-units/component-list-units/component-list-units.component';
import { ComponentShowUnitsComponent } from './admin-dashboard-units/component-show-units/component-show-units.component';
import { ComponentUpdateUnitsComponent } from './admin-dashboard-units/component-update-units/component-update-units.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AdminDashboardBaseComponent,
    AdminDashboardCatalogsComponent,
    ComponentListCatalogsComponent,
    ComponentAddCatalogsComponent,
    ComponentUpdateCatalogsComponent,
    ComponentShowCatalogsComponent,
    AdminDashboardCategoriesComponent,
    ComponentListCategoriesComponent,
    ComponentAddCategoriesComponent,
    ComponentUpdateCategoriesComponent,
    ComponentShowCategoriesComponent,
    AdminDashboardUnitsComponent,
    ComponentListUnitsComponent,
    ComponentAddUnitsComponent,
    ComponentUpdateUnitsComponent,
    ComponentShowUnitsComponent,
    AdminDashboardClientsComponent,
    ComponentListClientsComponent,
    ComponentAddClientsComponent,
    ComponentUpdateClientsComponent,
    ComponentShowClientsComponent,
    AdminDashboardProvidersComponent,
    ComponentListProvidersComponent,
    ComponentAddProvidersComponent,
    ComponentUpdateProvidersComponent,
    ComponentShowProvidersComponent,
    AdminDashboardAnalyticsComponent,
    ComponentListAnalyticsComponent,
    ComponentAddAnalyticsComponent,
    ComponentUpdateAnalyticsComponent,
    ComponentShowAnalyticsComponent,
    AdminDashboardMarketingCampaignsComponent,
    ComponentListMarketingCampaignsComponent,
    ComponentAddMarketingCampaignsComponent,
    ComponentUpdateMarketingCampaignsComponent,
    ComponentShowMarketingCampaignsComponent,
    AdminDashboardSubscriptionsComponent,
    ComponentListSubscriptionsComponent,
    ComponentAddSubscriptionsComponent,
    ComponentUpdateSubscriptionsComponent,
    ComponentShowSubscriptionsComponent,
    AdminDashboardParametersComponent,
    ComponentListParametersComponent,
    ComponentAddParametersComponent,
    ComponentUpdateParametersComponent,
    ComponentShowParametersComponent,
    AdminDashboardSubParametersComponent,
    ComponentListSubParametersComponent,
    ComponentAddSubParametersComponent,
    ComponentUpdateSubParametersComponent,
    ComponentShowSubParametersComponent,
    AdminDashboardSubSecondaryParametersComponent,
    ComponentListProductsParametersProductsComponent,
    ComponentListSubSecondaryParametersComponent,
    ComponentAddSubSecondaryParametersComponent,
    ComponentUpdateSubSecondaryParametersComponent,
    ComponentShowSubSecondaryParametersComponent,
    AdminDashboardSubTertiaryParametersComponent,
    ComponentListSubTertiaryParametersComponent,
    ComponentAddSubTertiaryParametersComponent,
    ComponentUpdateSubTertiaryParametersComponent,
    ComponentShowSubTertiaryParametersComponent,
    AdminDashboardCatalogsCategoriesComponent,
    ComponentListCatalogsCategoriesComponent,
    ComponentShowCatalogsCategoriesComponent,
    AdminDashboardProductsComponent,
    ComponentListProductsComponent,
    ComponentAddProductsComponent,
    ComponentUpdateProductsComponent,
    ComponentShowProductsComponent,
    AdminDashboardUnitsProductsComponent,
    ComponentListUnitsProductsComponent,
    ComponentShowUnitsProductsComponent,
    AdminDashboardProvidersProductsComponent,
    ComponentListProvidersProductsComponent,
    ComponentShowProvidersProductsComponent,
    AdminDashboardCategoriesProductsComponent,
    ComponentListCategoriesProductsComponent,
    ComponentShowCategoriesProductsComponent,
    AdminDashboardProductsDiscountsComponent,
    ComponentListProductsDiscountsComponent,
    ComponentAddProductsDiscountsComponent,
    ComponentUpdateProductsDiscountsComponent,
    ComponentShowProductsDiscountsComponent,
    AdminDashboardProductsImagesComponent,
    ComponentListProductsImagesComponent,
    ComponentAddProductsImagesComponent,
    ComponentUpdateProductsImagesComponent,
    ComponentShowProductsImagesComponent,
    AdminDashboardProductsParametersComponent,
    ComponentListProductsParametersComponent,
    ComponentAddProductsParametersComponent,
    ComponentShowProductsParametersComponent,
    AdminDashboardCommentsComponent,
    ComponentListCommentsComponent,
    AdminDashboardHomeComponent,
    AdminDashboardOrdersComponent,
    ComponentListOrdersComponent,
    ComponentAddOrdersComponent,
    ComponentUpdateOrdersComponent,
    ComponentShowOrdersComponent,
    AdminDashboardOrdersAmountsComponent,
    ComponentListOrdersAmountsComponent,
    ComponentAddOrdersAmountsComponent,
    ComponentUpdateOrdersAmountsComponent,
    ComponentShowOrdersAmountsComponent,
    AdminDashboardOrdersTransactionsComponent,
    ComponentListOrdersTransactionsComponent,
    ComponentAddOrdersTransactionsComponent,
    ComponentUpdateOrdersTransactionsComponent,
    ComponentShowOrdersTransactionsComponent,
    AdminDashboardOrdersDetailsComponent,
    ComponentListOrdersDetailsComponent,
    ComponentAddOrdersDetailsComponent,
    ComponentUpdateOrdersDetailsComponent,
    ComponentShowOrdersDetailsComponent,
    AdminDashboardOrdersDispatchesComponent,
    ComponentListOrdersDispatchesComponent,
    ComponentAddOrdersDispatchesComponent,
    ComponentUpdateOrdersDispatchesComponent,
    ComponentShowOrdersDispatchesComponent,
    AdminDashboardOrdersDispatchesProvidersComponent,
    ComponentListOrdersDispatchesProvidersComponent,
    ComponentShowOrdersDispatchesProvidersComponent,
    ComponentListOrdersDetailsProductsComponent,
    AdminDashboardOrdersClientsComponent,
    ComponentShowOrdersClientsComponent,
    ComponentListOrdersClientsComponent,
    AdminDashboardProductsSubParametersComponent,
    ComponentListProductsSubParametersComponent,
    ComponentAddProductsSubParametersComponent,
    ComponentUpdateProductsSubParametersComponent,
    ComponentShowProductsSubParametersComponent,
    AdminDashboardProductsSubTertiaryParametersComponent,
    ComponentListProductsSubTertiaryParametersComponent,
    ComponentAddProductsSubTertiaryParametersComponent,
    ComponentUpdateProductsSubTertiaryParametersComponent,
    ComponentShowProductsSubTertiaryParametersComponent,
    AdminDashboardContactsComponent,
    ComponentListContactsComponent,
    ComponentAddContactsComponent,
    ComponentUpdateContactsComponent,
    ComponentShowContactsComponent,
    AdminDashboardCatalogsProductsComponent,
    ComponentListCatalogsProductsComponent,
    ComponentShowCatalogsProductsComponent,
  ],
  imports: [
    AdminDashboardRoutingModule,
    CommonModule,
    SharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule,
  ],
  exports:[],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class AdminDashboardModule { }
