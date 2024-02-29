import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, mergeMap, of } from 'rxjs';
import { OrderDetailsHttp } from 'src/app/shared/http/order-details.http';
import { OrderHttp } from 'src/app/shared/http/orders.http';
import { ProductHttp } from 'src/app/shared/http/products.http';
import { CommonUtils } from 'src/app/shared/utils/common.utils';


@Component({
  selector: 'app-admin-dashboard-orders-details',
  templateUrl: './admin-dashboard-orders-details.component.html',
  styleUrls: ['./admin-dashboard-orders-details.component.css']
})
export class AdminDashboardOrdersDetailsComponent implements OnInit {

  data: any[] = [];
  products: any[] = [];
  item = {};
  orderId = 0;
  order;
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private orderDetailsHttp: OrderDetailsHttp, private productHttp: ProductHttp, private orderHttp: OrderHttp,
    private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.activatedRoute.params
    .pipe(
      mergeMap(params => {
        this.orderId = +params['id'];
        return this.orderHttp.getById(this.orderId);
      }),
      mergeMap(item => {
        this.order = item;
        return this.productHttp.getAll();
      }),
      mergeMap(products => {
        this.products = products;
        return this.orderDetailsHttp.getAll();
      }),
    ).pipe(
      catchError(error => {
        console.error('Error al consultar datos:', error);
        return of([]); // Devuelve un observable vac&iacute;o para que la cadena de observables pueda continuar
      })
    ).subscribe((orderDetailsData) => {
      this.data = orderDetailsData.filter((orderDetail: any) => orderDetail.orderId === this.orderId);
    });
  }

  handleAdded(item: any) {

    const { order, product, ...data } = item;
    data.status = CommonUtils.fromStatusBoolean(data.status);
    this.orderDetailsHttp.add(data).subscribe((response) => {
      const data = { ...response, order, product };
      this.data.push(data);
      this.updateItem = false;
      this.showItem = false;
      this.addItem = false;
      (window as any).success("¡Guardado!");
    });
  }

  handleUpdated(item: any) {

    this.data = this.data.map((data) => {
      if (data.orderDetailId === item.orderDetailId) {
        return {
          ...data,
          ...item
        };
      }
      return data;
    });
    this.addItem = false;
    this.updateItem = false;
    this.showItem = false;
  }

  handleTableUpdated(item: any) {
    this.item = item;
    this.updateItem = true;
    this.addItem = false;
    this.showItem = false;
  }

  handleTableDeleted(data: any[]) {
    this.data = data;
  }


  handleTableShowed(data: any) {
    this.item = data.item;
    this.showItem = data.showItem;
    this.addItem = false;
    this.updateItem = false;
  }

  back(){
    this.router.navigate([`/admin/dashboard/orders`]);
  }
}
