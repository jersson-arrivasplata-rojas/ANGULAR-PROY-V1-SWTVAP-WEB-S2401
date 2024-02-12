import { Injectable, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subscription, debounceTime, map, merge } from "rxjs";
import { TimersEnum } from "src/app/shared/config/timers.enum";

@Injectable()
export class AdminDashboardOrdersDetailsPresenter implements OnDestroy {
  private subscription: Subscription;
  itemForm: FormGroup;

  constructor() { }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  handleForm() {

    this.subscription = merge(
      this.itemForm.get('quantity').valueChanges.pipe(map(val => ({ field: 'quantity', value: val ? val : 0 }))),
      this.itemForm.get('unitPrice').valueChanges.pipe(map(val => ({ field: 'unitPrice', value: val ? val : 0 }))),
      this.itemForm.get('unitPriceUSD').valueChanges.pipe(map(val => ({ field: 'unitPriceUSD', value: val ? val : 0 }))),
      this.itemForm.get('unitPriceEUR').valueChanges.pipe(map(val => ({ field: 'unitPriceEUR', value: val ? val : 0 }))),
      this.itemForm.get('discountPercentage').valueChanges.pipe(map(val => ({ field: 'discountPercentage', value: val ? val : 0 }))),
    ).pipe(
      debounceTime(TimersEnum.TIMER_VALUES_CHANGES) // Retrasa los valores emitidos por 2 segundos
    )
      .subscribe((data) => {
        this.onChangeValues(data);
      });
  }

  onChangeValues({ field, value }) {
    let { quantity, unitPrice, unitPriceUSD, unitPriceEUR, discountPercentage } = this.itemForm.value;

    if (field === 'quantity') quantity = value;
    else if (field === 'unitPrice') unitPrice = value;
    else if (field === 'unitPriceUSD') unitPriceUSD = value;
    else if (field === 'unitPriceEUR') unitPriceEUR = value;
    else if (field === 'discountPercentage') discountPercentage = value;

    const discount = (quantity, discountPercentage, unitPrice) => parseFloat(quantity) * unitPrice * (discountPercentage / 100);
    const priceTotal = (quantity, unitPrice) => parseFloat(quantity) * unitPrice;

    const subtotal = priceTotal(quantity, unitPrice) - discount(quantity, discountPercentage, unitPrice);
    const subtotalUSD = priceTotal(quantity, unitPriceUSD) - discount(quantity, discountPercentage, unitPriceUSD);
    const subtotalEUR = priceTotal(quantity, unitPriceEUR) - discount(quantity, discountPercentage, unitPriceEUR);

    this.itemForm.patchValue({
      subtotal,
      subtotalUSD,
      subtotalEUR,
      discountPercentage
    }, { emitEvent: false });
  }
}
