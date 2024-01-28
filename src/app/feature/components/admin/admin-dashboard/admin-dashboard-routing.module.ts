import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardBaseComponent } from './admin-dashboard-base/admin-dashboard-base.component';
import { AdminDashboardCatalogsComponent } from './admin-dashboard-catalogs/admin-dashboard-catalogs.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
