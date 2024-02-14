import { Injectable, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subscription, debounceTime, map, merge } from "rxjs";
import { TimersEnum } from "src/app/shared/config/timers.enum";

@Injectable()
export class AdminDashboardOrdersAmountsPresenter implements OnDestroy {
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
      this.itemForm.get('amount').valueChanges.pipe(map(val => ({ field: 'amount', value: val ? val : 0 }))),
      this.itemForm.get('amountUSD').valueChanges.pipe(map(val => ({ field: 'amountUSD', value: val ? val : 0 }))),
      this.itemForm.get('amountEUR').valueChanges.pipe(map(val => ({ field: 'amountEUR', value: val ? val : 0 })))
    ).pipe(
      debounceTime(TimersEnum.TIMER_VALUES_CHANGES) // Retrasa los valores emitidos por 2 segundos
    )
      .subscribe((data) => {
        this.onChangeValues(data);
      });
  }

  onChangeValues({ field, value }) {
    let { amount, amountUSD, amountEUR } = this.itemForm.value;

    if (field === 'amount') amount = value;
    else if (field === 'amountUSD') amountUSD = value;
    else if (field === 'amountEUR') amountEUR = value;

    this.itemForm.patchValue({
      amount,
      amountUSD,
      amountEUR
    }, { emitEvent: false });
  }
}
