import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { emailDomainValidator } from 'src/app/shared/validators/email-domain.validators';

@Component({
  selector: 'swtvap-component-add-subscriptions',
  templateUrl: './component-add-subscriptions.component.html',
  styleUrls: ['./component-add-subscriptions.component.scss'],
})
export class ComponentAddSubscriptionsComponent {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      email: ['', [Validators.required, emailDomainValidator()]],
      subscribedAt: [CommonUtils.getDayNow(), [Validators.required, Validators.pattern(PatternEnum.DATE)]],
      status: [true, Validators.required]
    });
  }

  add() {
    if (this.itemForm.valid) {
      const item = { ...this.init(), ...this.itemForm.value };
      item.status = Number(item.status);
      this.added.emit(item);
    }
  }

  init() {
    return {
      email: '',
      subscribedAt: '',
      status: false
    };
  }
}
