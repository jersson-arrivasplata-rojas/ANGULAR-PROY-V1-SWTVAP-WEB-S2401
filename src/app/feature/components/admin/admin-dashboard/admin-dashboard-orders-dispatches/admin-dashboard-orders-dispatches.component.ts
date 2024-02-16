import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, mergeMap, of } from 'rxjs';
import { DispatcheHttp } from 'src/app/shared/http/dispatches.http';
import { ProviderHttp } from 'src/app/shared/http/providers.http';


@Component({
  selector: 'app-admin-dashboard-orders-dispatches',
  templateUrl: './admin-dashboard-orders-dispatches.component.html',
  styleUrls: ['./admin-dashboard-orders-dispatches.component.css']
})
export class AdminDashboardOrdersDispatchesComponent implements OnInit {

  data: any[] = [];
  providers: any[] = [];
  item = {};
  ordersId = 0;
  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private orderDispatchesHttp: DispatcheHttp, private providerHttp: ProviderHttp,
    private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.activatedRoute.params
    .pipe(
      mergeMap(params => {
        this.ordersId = +params['id'];
        return this.providerHttp.getAll();
      }),
      mergeMap(providers => {
        this.providers = providers;
        return this.orderDispatchesHttp.getAll();
      }),
    ).pipe(
      catchError(error => {
        console.error('Error al consultar datos:', error);
        return of([]); // Devuelve un observable vacío para que la cadena de observables pueda continuar
      })
    ).subscribe((orderDispatchesData) => {
      this.data = orderDispatchesData.filter((orderDispatch: any) => orderDispatch.orderId === this.ordersId);
      this.data.map((orderDispatch: any) => {
        orderDispatch.provider = this.providers.find((provider: any) => provider.providerId === orderDispatch.providerId);
      });
    });
  }

  handleAdded(data: any) {
    this.orderDispatchesHttp.add(data).subscribe((data) => {
      this.data.push(data);
      this.updateItem = false;
      this.showItem = false;
      this.addItem = false;
    });
  }

  handleUpdated(item: any) {
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
