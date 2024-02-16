import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, mergeMap, of } from 'rxjs';
import { OrderDetailsHttp } from 'src/app/shared/http/order-details.http';
import { ProductHttp } from 'src/app/shared/http/products.http';


@Component({
  selector: 'app-admin-dashboard-orders-details',
  templateUrl: './admin-dashboard-orders-details.component.html',
  styleUrls: ['./admin-dashboard-orders-details.component.css']
})
export class AdminDashboardOrdersDetailsComponent implements OnInit {

  data: any[] = [];
  products: any[] = [];
  item = {};
  ordersId = 0;
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private orderDetailsHttp: OrderDetailsHttp, private productHttp: ProductHttp,
    private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.activatedRoute.params
    .pipe(
      mergeMap(params => {
        this.ordersId = +params['id'];
        return this.productHttp.getAll();
      }),
      mergeMap(products => {
        this.products = products;
        return this.orderDetailsHttp.getAll();
      }),
    ).pipe(
      catchError(error => {
        console.error('Error al consultar datos:', error);
        return of([]); // Devuelve un observable vacío para que la cadena de observables pueda continuar
      })
    ).subscribe((orderDetailsData) => {
      this.data = orderDetailsData.filter((orderDetail: any) => orderDetail.orderId === this.ordersId);
    });
  }

  handleAdded(data: any) {
    this.orderDetailsHttp.add(data).subscribe((data) => {
      this.data.push(data);
      this.updateItem = false;
      this.showItem = false;
      this.addItem = false;
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
