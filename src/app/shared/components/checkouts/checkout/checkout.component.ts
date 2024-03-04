import { Component, EventEmitter, Output } from '@angular/core';
import { checkoutFormFN } from 'src/app/shared/functions/checkout.form.function';

@Component({
  selector: 'swtvap-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  public cartflag: boolean = false;
  public checkout = checkoutFormFN();
  @Output() onContinue: EventEmitter<any> = new EventEmitter();
  @Output() onBuy: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.ref();
  }
  ref() {
    this.cartflag = false;
    setTimeout(() => {
      this.cartflag = true;
    }, 10);
  }

  buy($event){
    this.onBuy.emit($event);
  }

  continue($event){
    this.onContinue.emit($event);
  }
}
