import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { StatusProviderEnum } from 'src/app/shared/config/status-provider.enum';
import { ProviderHttp } from 'src/app/shared/http/providers.http';

@Component({
  selector: 'app-component-show-orders-dispatches',
  templateUrl: './component-show-orders-dispatches.component.html',
  styleUrls: ['./component-show-orders-dispatches.component.scss'],
})
export class ComponentShowOrdersDispatchesComponent implements OnChanges {
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};

  constructor(private providerHttp:ProviderHttp){ }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item = changes['item'].currentValue;
      this.item.status = StatusProviderEnum[this.item.status];

      if(this.item.providerId){
        this.providerHttp.getById(this.item.providerId).subscribe((provider) => {
          this.item.provider = provider;
        });
      }
    }
  }

  getStatusProvider(value: string | number): string {
    return StatusProviderEnum[value] || '';
  }
}
