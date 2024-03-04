import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/interfaces/store';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { NodeStoreService } from 'src/app/services/node-store.service';
let stores_uri = '';
@Component({
  selector: 'swtvap-admin-dashboard-map',
  templateUrl: './admin-dashboard-map.component.html',
  styleUrls: ['./admin-dashboard-map.component.css']
})
export class AdminDashboardMapComponent implements OnInit {
  public store:Store=null;


  constructor(private authorizationService:AuthorizationService,
    public nodeStoreService:NodeStoreService) {
    nodeStoreService.getStore().subscribe(data=>{
      this.store = data.store;
    }); 
  }

  ngOnInit(): void {

  }

}
