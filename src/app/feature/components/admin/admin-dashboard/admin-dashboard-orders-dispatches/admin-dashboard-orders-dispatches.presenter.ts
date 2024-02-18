import { Injectable, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subscription, debounceTime, map, merge } from "rxjs";
import { TimersEnum } from "src/app/shared/config/timers.enum";

@Injectable()
export class AdminDashboardOrdersDispatchesPresenter implements OnDestroy {
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
      this.itemForm.get('cost').valueChanges.pipe(map(val => ({ field: 'cost', value: val ? val : 0 })))
    ).pipe(
      debounceTime(TimersEnum.TIMER_VALUES_CHANGES) // Retrasa los valores emitidos por 2 segundos
    )
      .subscribe((data) => {
        this.onChangeValues(data);
      });
  }

  onChangeValues({ field, value }) {
    let { cost } = this.itemForm.value;

    if (field === 'cost') cost = parseFloat(value);

    this.itemForm.patchValue({
      cost
    }, { emitEvent: false });
  }
}
