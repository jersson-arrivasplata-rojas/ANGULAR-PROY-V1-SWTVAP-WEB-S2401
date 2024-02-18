import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { TypesEnum } from 'src/app/shared/config/types.enum';
import { ClientHttp } from 'src/app/shared/http/clients.http';
import { OrderHttp } from 'src/app/shared/http/orders.http';
import { ShareDataService } from 'src/app/shared/services/share-data.service';


@Component({
  selector: 'app-admin-dashboard-orders-clients',
  templateUrl: './admin-dashboard-orders-clients.component.html',
  styleUrls: ['./admin-dashboard-orders-clients.component.css']
})
export class AdminDashboardOrdersClientsComponent implements OnInit {


  data: any[] = [];
  item = {};
  order = {};
  properties = {
    id: 0,
    type: ''
  };
  typesEnum = TypesEnum;

  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private clientHttp: ClientHttp, private orderHttp: OrderHttp,
    private shareDataService: ShareDataService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params
      .pipe(
        mergeMap(params => {
          this.properties.id = +params['id'];
          return this.clientHttp.getAll();
        }),
        mergeMap(clients => {
          this.data = clients;
          return this.orderHttp.getById(this.properties.id);
        })
      )
      .subscribe(order => {
        this.shareDataService.add({ order, add: true });
      });
  }


  handleTableShowed(data: any) {
    this.item = data.item;
    this.showItem = data.showItem;
    this.addItem = false;
    this.updateItem = false;

  }

  back() {
    this.router.navigate([`/admin/dashboard/orders`]);
  }
}
