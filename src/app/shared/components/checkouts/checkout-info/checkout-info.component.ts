import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from 'src/app/shared/services/cart.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'swtvap-checkout-info',
  templateUrl: './checkout-info.component.html',
  styleUrls: ['./checkout-info.component.scss'],
})
export class CheckoutInfoComponent implements OnInit {
  public checkoutForm: any = {};
  public errorsInfo: any = {};
  @Input('checkoutFields') __checkout: any = {};
  @Output() onContinue: EventEmitter<any> = new EventEmitter();
  @Output() onBuy: EventEmitter<any> = new EventEmitter();

  constructor(
    public fb: FormBuilder,
    public storage: StorageService,
    public cartService: CartService
  ) {}

  ngOnInit() {
    this.loadForm();
  }

  loadForm() {
    let temp = {};
    let checkoutInfo = this.cartService.loadCheckoutInfo('customerInfo');
    if (
      checkoutInfo === undefined ||
      checkoutInfo === '' ||
      checkoutInfo === null
    ) {
      checkoutInfo = {};
    }
    this.__checkout.forEach(item => {
      temp[item.uid] = [checkoutInfo[item.uid], item.validation];
    });

    this.checkoutForm = this.fb.group(temp);
  }

  send() {
    if (this.checkoutForm.valid) {
      this.storage.set({
        customerInfo: this.checkoutForm.value
      });
      this.onBuy.emit();
    }
  }

  continue(){
    this.onContinue.emit();
  }
}
