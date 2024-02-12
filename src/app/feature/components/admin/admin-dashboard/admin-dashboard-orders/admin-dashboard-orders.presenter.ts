import { Injectable, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subscription, debounceTime, map, merge } from "rxjs";
import { TimersEnum } from "src/app/shared/config/timers.enum";

@Injectable()
export class AdminDashboardOrdersPresenter implements OnDestroy {
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
      this.itemForm.get('taxes').valueChanges.pipe(map(val => ({ field: 'taxes', value: val ? val : 0 }))),
      this.itemForm.get('taxesUSD').valueChanges.pipe(map(val => ({ field: 'taxesUSD', value: val ? val : 0 }))),
      this.itemForm.get('taxesEUR').valueChanges.pipe(map(val => ({ field: 'taxesEUR', value: val ? val : 0 }))),
      this.itemForm.get('discountAmount').valueChanges.pipe(map(val => ({ field: 'discountAmount', value: val ? val : 0 })))
    ).pipe(
      debounceTime(TimersEnum.TIMER_VALUES_CHANGES) // Retrasa los valores emitidos por 2 segundos
    )
      .subscribe((data) => {
        this.onChangeValues(data);
      });
  }

  onChangeValues({ field, value }) {
    let { subtotal, subtotalUSD, subtotalEUR, taxes, taxesUSD, taxesEUR, discountAmount } = this.itemForm.value;

    if (field === 'subtotal') subtotal = value;
    else if (field === 'subtotalUSD') subtotalUSD = value;
    else if (field === 'subtotalEUR') subtotalEUR = value;
    else if (field === 'taxes') taxes = value;
    else if (field === 'taxesUSD') taxesUSD = value;
    else if (field === 'taxesEUR') taxesEUR = value;
    else if (field === 'discountAmount') discountAmount = value;

    const discount = (subtotal, taxes, discountPercentage) => (parseFloat(subtotal) + parseFloat(taxes)) * (discountPercentage / 100);
    const priceTotal = (subtotal, taxes, discountPercentage) => (parseFloat(subtotal) + parseFloat(taxes)) - discount(subtotal, taxes, discountPercentage);

    const total = priceTotal(subtotal, taxes, discountAmount);
    const totalUSD = priceTotal(subtotalUSD, taxesUSD, discountAmount);
    const totalEUR = priceTotal(subtotalEUR, taxesEUR, discountAmount);

    this.itemForm.patchValue({
      total,
      totalUSD,
      totalEUR
    }, { emitEvent: false });
  }
}
