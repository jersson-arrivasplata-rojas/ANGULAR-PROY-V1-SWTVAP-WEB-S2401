import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, mergeMap } from 'rxjs';
import { TypesEnum } from 'src/app/shared/config/types.enum';
import { DispatcheHttp } from 'src/app/shared/http/dispatches.http';
import { ProviderHttp } from 'src/app/shared/http/providers.http';
import { ShareDataService } from 'src/app/shared/services/share-data.service';

@Component({
  selector: 'app-component-list-orders-dispatches-providers',
  templateUrl: './component-list-orders-dispatches-providers.component.html',
  styleUrls: ['./component-list-orders-dispatches-providers.component.scss'],
})
export class ComponentListOrdersDispatchesProvidersComponent implements OnInit {
  @Input() data: any[] = [];
  dispatches: any[] = [];
  @Input() properties = {
    id: 0,
    dispatchId: 0,
    type: ''
  };

  @Output() showed: EventEmitter<any> = new EventEmitter();

  typesEnum = TypesEnum;

  item: any;

  showItem = false;
  searchTerm = '';

  constructor(private providerHttp: ProviderHttp, private dispatcheHttp: DispatcheHttp,
    private shareDataService: ShareDataService) { }

  ngOnInit(): void {
    this.shareDataService.getData().subscribe((response: any) => {
      if (response && response.add) {
        this.dispatches = response.dispatches;

        this.getRelationshipByOrderAndDispatch(this.dispatches);
      }
    });
  }

  show(item: any) {
    if (item.providerId === this.item?.providerId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }

    const observable$ = this.providerHttp.getById(item.providerId);

    observable$
      .pipe(
        map((response: any) => {
          this.data.map((f) => {
            if (f.providerId === response.providerId) {
              response.relationship = f.relationship;
            }
          });
          return response;
        })
      )
      .subscribe((response) => {
        this.item = response;
        if (!this.showItem) this.showItem = !this.showItem;
        this.showed.emit({ item: this.item, showItem: this.showItem });
      });
  }

  async delete(item: any) {
    let text = '¡Presiona el bot\xf3n para eliminar!';
    if (await confirm(text) === true) {
      this.dispatcheHttp.getById(this.properties.dispatchId)
        .pipe(
          mergeMap((response) => {
            response.providerId = null;
            response.orderId = this.properties.id;
            const observable$ = this.dispatcheHttp.update(response.id, response);
            return observable$;
          })
        )
        .subscribe((dispatch) => {
          this.data.forEach(item => {
            const relationship = (item.providerId === dispatch.providerId) ? true : false;
            item.relationship = relationship;
          });
          (window as any).success("¡Actualizado!");
        });
    }
  }

  async add(item: any) {
    let text = 'Presiona el bot\xf3n para continuar! ';
    if (await confirm(text) === true) {
      this.dispatcheHttp.getById(this.properties.dispatchId)
        .pipe(
          mergeMap((response) => {
            response.providerId = item.providerId;
            response.orderId = this.properties.id;
            const observable$ = this.dispatcheHttp.update(response.id, response);
            return observable$;
          })
        )
        .subscribe((dispatch) => {
          this.data.forEach(item => {
            const relationship = (item.providerId === dispatch.providerId) ? true : false;
            item.relationship = relationship;
          });
          (window as any).success("¡Actualizado!");
        });
    }
  }

  getRelationship(item: any) {
    const id = item.providerId;
    const dispatchId = this.properties.dispatchId;
    const data = this.dispatches.find((f) => (f.providerId === id && f.id === dispatchId));
    return data;
  }

  getRelationshipByOrder(item: any) {
    const id = this.properties.id;
    const data = this.dispatches.find((f) => {
      return (f.providerId === item.providerId && f.orderId === id)
    });
    return data;
  }

  getRelationshipByOrderAndDispatch(dispatches: any[]) {
    let providersIds = [...new Set(dispatches.map(item => {
      if (this.properties.id === item.orderId && this.properties.dispatchId === item.id) {
        return item.providerId
      }
    }))];
    providersIds = providersIds.filter((item) => item !== undefined);

    this.data.forEach(item => {
      if (providersIds.includes((item.providerId))) {
        item.relationship = true;
      }
    });
  }
}
