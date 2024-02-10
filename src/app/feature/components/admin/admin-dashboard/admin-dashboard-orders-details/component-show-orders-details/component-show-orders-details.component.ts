import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ProductHttp } from 'src/app/shared/http/products.http';

@Component({
  selector: 'app-component-show-orders-details',
  templateUrl: './component-show-orders-details.component.html',
  styleUrls: ['./component-show-orders-details.component.scss'],
})
export class ComponentShowOrdersDetailsComponent implements OnChanges {
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};

  productName: string = '';

  constructor(private productHttp: ProductHttp){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item = changes['item'].currentValue;
      this.getProductName(this.item.productId);
    }
  }

  getProductName(id: number){
    this.productHttp.getById(id).subscribe((res) => {
      this.productName = res.name;
    });
  }
}
