import { Component, OnInit } from '@angular/core';
import { catchError, mergeMap, of } from 'rxjs';
import { ClientHttp } from 'src/app/shared/http/clients.http';
import { OrderAmountsHttp } from 'src/app/shared/http/order-amounts.http';
import { OrderDetailsHttp } from 'src/app/shared/http/order-details.http';
import { OrderTransactionsHttp } from 'src/app/shared/http/order-transactions.http';
import { OrderHttp } from 'src/app/shared/http/orders.http';


@Component({
  selector: 'app-admin-dashboard-orders',
  templateUrl: './admin-dashboard-orders.component.html',
  styleUrls: ['./admin-dashboard-orders.component.css'],
})
export class AdminDashboardOrdersComponent implements OnInit {

  data: any[] = [];
  clients: any[] = [];
  item = {};
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private orderHttp: OrderHttp, private orderDetailsHttp: OrderDetailsHttp,
    private orderAmountsHttp: OrderAmountsHttp, private orderTransactionsHttp: OrderTransactionsHttp,
    private clientHttp: ClientHttp) { }

  ngOnInit() {
    this.orderHttp.getAll().pipe(
      mergeMap(orderData => {
        this.data = orderData;
        return this.clientHttp.getAll();
      }),
      mergeMap(clientData => {
        this.clients = clientData;
        return this.orderDetailsHttp.getAll();
      }),
      mergeMap(orderDetails => {
        this.data.map((order: any) => {
          order.details = orderDetails.filter(orderDetail => orderDetail.order.orderId === order.orderId);
        });
        return this.orderAmountsHttp.getAll();
      }),
      mergeMap(orderAmounts => {
        this.data.map((order: any) => {
          order.amounts = orderAmounts.filter(orderAmount => orderAmount.orderId === order.orderId);
        });
        return this.orderTransactionsHttp.getAll();
      })
    ).pipe(
      catchError(error => {
        console.error('Error al consultar datos:', error);
        return of([]); // Devuelve un observable vac&iacute;o para que la cadena de observables pueda continuar
      })
    ).subscribe((orderTransactions) => {
      this.data.map((order: any) => {
        order.units = orderTransactions.filter(orderTransaction => orderTransaction.orderId === order.orderId);
      });
    });
  }

  handleAdded(data: any) {
    this.orderHttp.add(data).subscribe((data) => {
      this.data.push(data);
      this.updateItem = false;
      this.showItem = false;
      this.addItem = false;
      (window as any).success("¡Guardado!");
    });
  }

  handleUpdated(item: any) {
    this.data = this.data.map((data) => {
      if (data.orderId === item.orderId) {
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
}
