import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { StatusProviderEnum } from 'src/app/shared/config/status-provider.enum';
import { DispatcheHttp } from 'src/app/shared/http/dispatches.http';
import { OrderHttp } from 'src/app/shared/http/orders.http';
import { ProviderHttp } from 'src/app/shared/http/providers.http';


@Component({
  selector: 'swtvap-admin-dashboard-orders-dispatches',
  templateUrl: './admin-dashboard-orders-dispatches.component.html',
  styleUrls: ['./admin-dashboard-orders-dispatches.component.css']
})
export class AdminDashboardOrdersDispatchesComponent implements OnInit {

  data: any[] = [];
  providers: any[] = [];
  item = {};
  orderId = 0;
  order;
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private orderDispatchesHttp: DispatcheHttp, private providerHttp: ProviderHttp,
    private orderHttp: OrderHttp, private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.activatedRoute.params
    .pipe(
      mergeMap(params => {
        this.orderId = +params['id'];
        return this.orderHttp.getById(this.orderId);
      }),
      mergeMap(item => {
        this.order = item;
        return this.providerHttp.getAll();
      }),
      mergeMap(providers => {
        this.providers = providers;
        return this.orderDispatchesHttp.getAll();
      }),
    ).subscribe((orderDispatchesData) => {
      this.data = orderDispatchesData.filter((orderDispatch: any) => orderDispatch.orderId === this.orderId);
      this.data.map((orderDispatch: any) => {
        orderDispatch.provider = this.providers.find((provider: any) => provider.providerId === orderDispatch.providerId);
      });
    });
  }

  handleAdded(data: any) {
    this.orderDispatchesHttp.add(data).subscribe((data) => {
      data.status = StatusProviderEnum[data.status];
      this.data.push(data);
      this.updateItem = false;
      this.showItem = false;
      this.addItem = false;
      (window as any).success("¡Guardado!");
    });
  }

  handleUpdated(item: any) {
    item.status = StatusProviderEnum[item.status];
    this.data = this.data.map((data) => {
      if (data.id === item.id) {
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
