import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardAnalyticsComponent } from './admin-dashboard-analytics/admin-dashboard-analytics.component';
import { AdminDashboardBaseComponent } from './admin-dashboard-base/admin-dashboard-base.component';
import { AdminDashboardCatalogsCategoriesComponent } from './admin-dashboard-catalogs-categories/admin-dashboard-catalogs-categories.component';
import { AdminDashboardCatalogsComponent } from './admin-dashboard-catalogs/admin-dashboard-catalogs.component';
import { AdminDashboardCategoriesComponent } from './admin-dashboard-categories/admin-dashboard-categories.component';
import { AdminDashboardClientsComponent } from './admin-dashboard-clients/admin-dashboard-clients.component';
import { AdminDashboardMarketingCampaignsComponent } from './admin-dashboard-marketing-campaigns/admin-dashboard-marketing-campaigns.component';
import { AdminDashboardParametersComponent } from './admin-dashboard-parameters/admin-dashboard-parameters.component';
import { AdminDashboardProvidersComponent } from './admin-dashboard-providers/admin-dashboard-providers.component';
import { AdminDashboardSubParametersComponent } from './admin-dashboard-sub-parameters/admin-dashboard-sub-parameters.component';
import { AdminDashboardSubscriptionsComponent } from './admin-dashboard-subscriptions/admin-dashboard-subscriptions.component';
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
        path: 'catalogs',
        component: AdminDashboardCatalogsComponent
      },
      {
        path: 'categories',
        component: AdminDashboardCategoriesComponent
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
        path: 'subscriptions',
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
        path: 'categories/add/:id',
        component: AdminDashboardCatalogsCategoriesComponent
      },
      {
        path: 'catalogs/add/:id',
        component: AdminDashboardCatalogsCategoriesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
