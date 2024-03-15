import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ProductHttp } from 'src/app/shared/http/products.http';

@Component({
  selector: 'swtvap-component-show-orders-details',
  templateUrl: './component-show-orders-details.component.html',
  styleUrls: ['./component-show-orders-details.component.scss'],
})
export class ComponentShowOrdersDetailsComponent implements OnChanges {
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};

  productName: string = '';
  productNameEn: string = '';

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
      this.productNameEn = res.name_en;
    });
  }
}
