import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { OrderAmountsHttp } from 'src/app/shared/http/order-amounts.http';
import { OrderHttp } from 'src/app/shared/http/orders.http';


@Component({
  selector: 'swtvap-admin-dashboard-orders-amounts',
  templateUrl: './admin-dashboard-orders-amounts.component.html',
  styleUrls: ['./admin-dashboard-orders-amounts.component.css']
})
export class AdminDashboardOrdersAmountsComponent implements OnInit {

  data: any[] = [];
  item = {};
  orderId = 0;
  order;
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private orderAmountsHttp: OrderAmountsHttp, private orderHttp: OrderHttp,
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
        return this.orderAmountsHttp.getAll();
      }),
    ).subscribe((orderAmountsData) => {
      this.data = orderAmountsData.filter((orderAmount: any) => orderAmount.orderId === this.orderId);
    });
  }

  handleAdded(data: any) {
    this.orderAmountsHttp.add(data).subscribe((data) => {
      this.data.push(data);
      this.updateItem = false;
      this.showItem = false;
      this.addItem = false;
      (window as any).success("¡Guardado!");
    });
  }

  handleUpdated(item: any) {
    this.data = this.data.map((data) => {
      if (data.orderAmountId === item.orderAmountId) {
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
