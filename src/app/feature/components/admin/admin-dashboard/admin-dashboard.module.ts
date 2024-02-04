import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LaddaModule } from 'angular2-ladda';
import { CarouselModule } from 'ngx-owl-carousel-o';
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
import { AdminDashboardCatalogsComponent } from './admin-dashboard-catalogs/admin-dashboard-catalogs.component';
import { ComponentAddCatalogsComponent } from './admin-dashboard-catalogs/component-add-catalogs/component-add-catalogs.component';
import { ComponentListCatalogsComponent } from './admin-dashboard-catalogs/component-list-catalogs/component-list-catalogs.component';
import { ComponentShowCatalogsComponent } from './admin-dashboard-catalogs/component-show-catalogs/component-show-catalogs.component';
import { ComponentUpdateCatalogsComponent } from './admin-dashboard-catalogs/component-update-catalogs/component-update-catalogs.component';
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
import { AdminDashboardMarketingCampaignsComponent } from './admin-dashboard-marketing-campaigns/admin-dashboard-marketing-campaigns.component';
import { ComponentAddMarketingCampaignsComponent } from './admin-dashboard-marketing-campaigns/component-add-marketing-campaigns/component-add-marketing-campaigns.component';
import { ComponentListMarketingCampaignsComponent } from './admin-dashboard-marketing-campaigns/component-list-marketing-campaigns/component-list-marketing-campaigns.component';
import { ComponentShowMarketingCampaignsComponent } from './admin-dashboard-marketing-campaigns/component-show-marketing-campaigns/component-show-marketing-campaigns.component';
import { ComponentUpdateMarketingCampaignsComponent } from './admin-dashboard-marketing-campaigns/component-update-marketing-campaigns/component-update-marketing-campaigns.component';
import { AdminDashboardParametersComponent } from './admin-dashboard-parameters/admin-dashboard-parameters.component';
import { ComponentAddParametersComponent } from './admin-dashboard-parameters/component-add-parameters/component-add-parameters.component';
import { ComponentListParametersComponent } from './admin-dashboard-parameters/component-list-parameters/component-list-parameters.component';
import { ComponentShowParametersComponent } from './admin-dashboard-parameters/component-show-parameters/component-show-parameters.component';
import { ComponentUpdateParametersComponent } from './admin-dashboard-parameters/component-update-parameters/component-update-parameters.component';
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
import { AdminDashboardSubscriptionsComponent } from './admin-dashboard-subscriptions/admin-dashboard-subscriptions.component';
import { ComponentAddSubscriptionsComponent } from './admin-dashboard-subscriptions/component-add-subscriptions/component-add-subscriptions.component';
import { ComponentListSubscriptionsComponent } from './admin-dashboard-subscriptions/component-list-subscriptions/component-list-subscriptions.component';
import { ComponentShowSubscriptionsComponent } from './admin-dashboard-subscriptions/component-show-subscriptions/component-show-subscriptions.component';
import { ComponentUpdateSubscriptionsComponent } from './admin-dashboard-subscriptions/component-update-subscriptions/component-update-subscriptions.component';
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
    AdminDashboardCatalogsCategoriesComponent,
    ComponentListCatalogsCategoriesComponent,
    ComponentShowCatalogsCategoriesComponent,
  ],
  imports: [
    AdminDashboardRoutingModule,
    CommonModule,
    SharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    LaddaModule,
    CarouselModule,
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
