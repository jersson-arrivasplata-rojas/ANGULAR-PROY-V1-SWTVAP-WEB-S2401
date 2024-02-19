import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, mergeMap } from 'rxjs';
import { TypesEnum } from 'src/app/shared/config/types.enum';
import { OrderHttp } from 'src/app/shared/http/orders.http';
import { ShareDataService } from 'src/app/shared/services/share-data.service';

@Component({
  selector: 'app-component-list-orders-clients',
  templateUrl: './component-list-orders-clients.component.html',
  styleUrls: ['./component-list-orders-clients.component.scss'],
})
export class ComponentListOrdersClientsComponent implements OnInit {
  @Output() showed: EventEmitter<any> = new EventEmitter();
  @Input() data: any[] = [];
  @Input() properties = {
    id: 0,
    type: ''
  };


  order = {};
  typesEnum = TypesEnum;
  item: any;
  showItem = false;

  constructor(private orderHttp: OrderHttp, private shareDataService: ShareDataService) { }

  ngOnInit(): void {
    this.shareDataService.getData().subscribe((response: any) => {
      if (response && response.add) {
        this.order = response.order;

        this.getRelationshipByOrderAndClient(this.order);
      }
    });
  }

  show(item: any) {
    if (item.clientId === this.item?.clientId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }

    const observable$ = this.orderHttp.getById(this.properties.id);

    observable$
      .pipe(
        map((response: any) => {
          this.data.map((f) => {
            if (f.clientId === response.clientId) {
              response.relationship = f.relationship;
            }
          });
          return response;
        })
      )
      .subscribe((response) => {
        this.item = this.data.find((f) => f.clientId === response.clientId);
        if (!this.showItem) this.showItem = !this.showItem;
        this.showed.emit({ item: this.item, showItem: this.showItem });
      });
  }

  async delete(item: any) {
    let text = '¡Presiona el bot\xf3n para eliminar!';
    if (await confirm(text) === true) {
      this.orderHttp.getById(this.properties.id)
        .pipe(
          mergeMap((response) => {
            response.clientId = null;
            const observable$ = this.orderHttp.update(response.orderId, response);
            return observable$;
          })
        )
        .subscribe((order) => {
          this.data.forEach(item => {
            const relationship = (item.clientId === order.clientId) ? true : false;
            item.relationship = relationship;
          });
          (window as any).success("¡Actualizado!");
        });
    }
  }

  async add(item: any) {
    let text = 'Presiona el bot\xf3n para continuar! ';
    if (await confirm(text) === true) {
      this.orderHttp.getById(this.properties.id)
        .pipe(
          mergeMap((response) => {
            response.clientId = item.clientId;
            const observable$ = this.orderHttp.update(response.orderId, response);
            return observable$;
          })
        )
        .subscribe((order) => {
          this.data.forEach(item => {
            const relationship = (item.clientId === order.clientId) ? true : false;
            item.relationship = relationship;
          });
          (window as any).success("¡Actualizado!");
        });
    }
  }

  getRelationshipByOrderAndClient(order: any) {
    this.data.forEach(item => {
      if (order.clientId == item.clientId) {
        item.relationship = true;
      }
    });
  }
}
