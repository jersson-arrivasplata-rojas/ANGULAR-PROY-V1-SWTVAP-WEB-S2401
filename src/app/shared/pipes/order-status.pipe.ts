import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatusEnum as OrderStatus } from '../config/order-status.enum';

@Pipe({
  name: 'orderStatusPipe'
})
export class OrderStatusPipe implements PipeTransform {
  transform(value: OrderStatus): string {
    let statusText = OrderStatus[value];
    return statusText;
  }
}
