import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { TypesEnum } from 'src/app/shared/config/types.enum';
import { DispatcheHttp } from 'src/app/shared/http/dispatches.http';
import { ProviderHttp } from 'src/app/shared/http/providers.http';
import { ShareDataService } from 'src/app/shared/services/share-data.service';


@Component({
  selector: 'swtvap-admin-dashboard-orders-dispatches-providers',
  templateUrl: './admin-dashboard-orders-dispatches-providers.component.html',
  styleUrls: ['./admin-dashboard-orders-dispatches-providers.component.css']
})
export class AdminDashboardOrdersDispatchesProvidersComponent implements OnInit {


  data: any[] = [];
  item = {};
  properties = {
    id: 0,
    dispatchId: 0,
    type: '',
    deletedAt: ''
  };
  typesEnum = TypesEnum;

  addItem = false;
  updateItem = false;
  showItem = false;
  constructor(private providerHttp: ProviderHttp, private dispatcheHttp: DispatcheHttp,
    private shareDataService: ShareDataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params
      .pipe(
        mergeMap(params => {
          this.properties.id = +params['id'];
          this.properties.dispatchId = +params['idDispatch'];
          return this.providerHttp.getAll();
        }),
        mergeMap((providers) => {
          this.data = providers;
          return this.dispatcheHttp.getAll();
        })
      )
      .subscribe(dispatches => {
        this.shareDataService.add({ dispatches, add: true });
      });
  }


  handleTableShowed(data: any) {
    this.item = data.item;
    this.showItem = data.showItem;
    this.addItem = false;
    this.updateItem = false;

  }

  back(){
    this.router.navigate([`/admin/dashboard/orders/add-dispatches/${this.properties.id}`]);
  }
}
