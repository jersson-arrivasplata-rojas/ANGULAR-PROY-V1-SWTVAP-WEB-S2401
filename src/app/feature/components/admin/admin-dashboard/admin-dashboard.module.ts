import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as echarts from 'echarts';
import { Select2Module } from 'ng-select2-component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxSortableModule } from 'ngx-sortable';
import { AdminDashboardPrincipalComponent } from './admin-dashboard-base/admin-dashboard-principal.component';
import { AdminDashboardCategoriasComponent } from './admin-dashboard-categories/admin-dashboard-categories.component';
import { AdminDashboardClientesComponent } from './admin-dashboard-clients/admin-dashboard-clients.component';
import { AdminDashboardCustomizerComponent } from './admin-dashboard-customizer/admin-dashboard-customizer.component';
import { AdminDashboardInicioComponent } from './admin-dashboard-home/admin-dashboard-home.component';
import { AdminDashboardOrdenEditComponent } from './admin-dashboard-orden-edit/admin-dashboard-orden-edit.component';
import { AdminDashboardOrdenesComponent } from './admin-dashboard-ordenes/admin-dashboard-ordenes.component';
import { AdminDashboardFormasPagoComponent } from './admin-dashboard-payment-methods/admin-dashboard-payment-methodscomponent';
import { AdminDashboardProductosComponent } from './admin-dashboard-products/admin-dashboard-productos.component';
import { AdminDashboardPerfilTiendaComponent, DashboardHourContent } from './admin-dashboard-profile/admin-dashboard-perfil-tienda.component';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardSubcategoriasComponent } from './admin-dashboard-subcategorias/admin-dashboard-subcategorias.component';
import { AdminDashboardTrabajadoresComponent } from './admin-dashboard-trabajadores/admin-dashboard-trabajadores.component';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { LaddaModule } from 'angular2-ladda';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AdminDashboardBannersComponent } from './admin-dashboard-banners/admin-dashboard-banners.component';
import { AdminDashboardChatComponent } from './admin-dashboard-chat/admin-dashboard-chat.component';
import { AdminDashboardCommentsComponent } from './admin-dashboard-comments/admin-dashboard-comments.component';
import { AdminDashboardImageCropperComponent } from './admin-dashboard-image-cropper/admin-dashboard-image-cropper.component';
import { AdminDashboardFacturaComponent } from './admin-dashboard-invoice/admin-dashboard-invoice.component';
import { AdminDashboardMapComponent } from './admin-dashboard-map/admin-dashboard-map.component';
import { AdminDashboardPlanesComponent } from './admin-dashboard-planes/admin-dashboard-planes.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AdminDashboardPrincipalComponent,
    AdminDashboardInicioComponent,
    DashboardHourContent,
    AdminDashboardPerfilTiendaComponent,
    AdminDashboardCategoriasComponent,
    AdminDashboardSubcategoriasComponent,
    AdminDashboardProductosComponent,
    AdminDashboardFormasPagoComponent,
    AdminDashboardOrdenesComponent,
    AdminDashboardClientesComponent,
    AdminDashboardTrabajadoresComponent,
    AdminDashboardCustomizerComponent,
    AdminDashboardOrdenEditComponent,
    AdminDashboardBannersComponent,
    AdminDashboardPlanesComponent,
    AdminDashboardMapComponent,
    AdminDashboardChatComponent,
    AdminDashboardCommentsComponent,
    AdminDashboardImageCropperComponent,
    AdminDashboardFacturaComponent
  ],
  imports: [
    AdminDashboardRoutingModule,
    CommonModule,
    SharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    Select2Module,
    NgxSortableModule,
    ColorSketchModule,
    NgxEchartsModule.forRoot({
      echarts,//: () => import('echarts')
    }),
    PerfectScrollbarModule,
    ImageCropperModule,
    LaddaModule,
    CarouselModule,
    AngularEditorModule
  ],
  exports:[

    AdminDashboardPrincipalComponent,
    AdminDashboardInicioComponent,
    DashboardHourContent,
    AdminDashboardPerfilTiendaComponent,
    AdminDashboardCategoriasComponent,
    AdminDashboardSubcategoriasComponent,
    AdminDashboardProductosComponent,
    AdminDashboardFormasPagoComponent,
    AdminDashboardOrdenesComponent,
    AdminDashboardClientesComponent,
    AdminDashboardTrabajadoresComponent,
    AdminDashboardCustomizerComponent,
    AdminDashboardOrdenEditComponent,
    AdminDashboardBannersComponent,
    AdminDashboardPlanesComponent,
    AdminDashboardMapComponent,
    AdminDashboardChatComponent,
    AdminDashboardCommentsComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class AdminDashboardModule { }
