import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LaddaModule } from 'angular2-ladda';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminDashboardBaseComponent } from './admin-dashboard-base/admin-dashboard-base.component';
import { AdminDashboardCatalogsComponent } from './admin-dashboard-catalogs/admin-dashboard-catalogs.component';
import { ComponentAddCatalogsComponent } from './admin-dashboard-catalogs/component-add-catalogs/component-add-catalogs.component';
import { ComponentListCatalogsComponent } from './admin-dashboard-catalogs/component-list-catalogs/component-list-catalogs.component';
import { ComponentShowCatalogsComponent } from './admin-dashboard-catalogs/component-show-catalogs/component-show-catalogs.component';
import { ComponentUpdateCatalogsComponent } from './admin-dashboard-catalogs/component-update-catalogs/component-update-catalogs.component';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';


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
    ComponentShowCatalogsComponent
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
