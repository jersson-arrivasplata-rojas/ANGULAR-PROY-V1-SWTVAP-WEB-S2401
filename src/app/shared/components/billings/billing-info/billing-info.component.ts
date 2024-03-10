import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { companyDetailFN } from 'src/app/shared/functions/company-detail.function';
import { CartService } from 'src/app/shared/services/cart.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'swtvap-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.scss'],
})
export class BillingInfoComponent implements OnInit {
  @Output() onContinue: EventEmitter<any> = new EventEmitter();
  @Output() onBilling: EventEmitter<any> = new EventEmitter();

  public companyDetails: any = companyDetailFN();
  public customerDetails: any = {};
  public invoiceDate: any = new Date();
  public billingFlag: any = [];
  public invoiceNo: any = Math.floor(Math.random() * 10000);

  @Input('allProductList') __allprdts: any = {};

  constructor(public cart: CartService, public storage: StorageService) {}

  ngOnInit() {
    this.customerDetails = this.cart.loadBillingInfo('customerInfo');
    this.cart.allItems = this.__allprdts;
    this.cart.listCartItems();
    const cart = this.storage.get('mycart');
    this.billingFlag = JSON.stringify(cart);
  }
  clearCart() {
    let temp = {};
    localStorage.setItem(this.storage.storageName, JSON.stringify(temp));

    this.continue();
  }

  print() {
    let temp = {};
    localStorage.setItem(this.storage.storageName, JSON.stringify(temp));
    window.focus();
    window.print();
  }

  continue(){
    this.onContinue.emit();
  }
  billing(){
    this.onBilling.emit();
  }
}
