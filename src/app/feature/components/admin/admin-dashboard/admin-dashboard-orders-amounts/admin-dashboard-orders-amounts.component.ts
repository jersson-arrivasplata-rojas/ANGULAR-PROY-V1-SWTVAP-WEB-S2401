import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, mergeMap, of } from 'rxjs';
import { OrderAmountsHttp } from 'src/app/shared/http/order-amounts.http';


@Component({
  selector: 'app-admin-dashboard-orders-amounts',
  templateUrl: './admin-dashboard-orders-amounts.component.html',
  styleUrls: ['./admin-dashboard-orders-amounts.component.css']
})
export class AdminDashboardOrdersAmountsComponent implements OnInit {

  data: any[] = [];
  item = {};
  ordersId = 0;
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private orderAmountsHttp: OrderAmountsHttp, private activatedRoute: ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.activatedRoute.params
    .pipe(
      mergeMap(params => {
        this.ordersId = +params['id'];
        return this.orderAmountsHttp.getAll();
      }),
    ).pipe(
      catchError(error => {
        console.error('Error al consultar datos:', error);
        return of([]); // Devuelve un observable vacío para que la cadena de observables pueda continuar
      })
    ).subscribe((orderAmountsData) => {
      this.data = orderAmountsData;
    });
  }

  handleAdded(data: any) {
    this.orderAmountsHttp.add(data).subscribe((data) => {
      this.data.push(data);
      this.updateItem = false;
      this.showItem = false;
      this.addItem = false;
    });
  }

  handleUpdated(item: any) {
    this.data = this.data.map((response) => {
      if (response.orderAmountId === item.orderAmountId) {
        return item;
      }
      return response;
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
