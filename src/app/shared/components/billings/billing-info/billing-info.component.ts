import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StoreProfile } from 'src/app/shared/class/store-profile';
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

  @Input() profile: any;

  public companyDetails: any = {
    name: '',
    address: '',
    city: '',
    pincode: '',
    email: '',
    phone: ''
  };
  public customerDetails: any = {};
  public invoiceDate: any = new Date();
  public billingFlag: any = [];
  public invoiceNo: any = Math.floor(Math.random() * 10000);

  __allprdts: any = [];

  constructor(public cartService: CartService, public storage: StorageService) { }

  ngOnInit() {
    this.changeProfile();
    this.__allprdts = this.cartService.allItems;

    this.customerDetails = this.cartService.loadBillingInfo('customerInfo');
    const cart = this.storage.get('mycart');
    this.billingFlag = JSON.stringify(cart);
  }

  changeProfile() {
    const storeProfile = new StoreProfile(this.profile);
    this.companyDetails = {
      name: storeProfile.companyName,
      address: storeProfile.address,
      city: storeProfile.address,
      email: storeProfile.email,
      cellphone: storeProfile.cellphone,
    };
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

  continue() {
    this.onContinue.emit();
  }
  billing() {
    this.onBilling.emit();
  }

  getTotal() {
    const total = this.cartService.cartItemsList.reduce((acc, item) => acc + (item.price * item.qty), 0);
    return total;
  }
}
