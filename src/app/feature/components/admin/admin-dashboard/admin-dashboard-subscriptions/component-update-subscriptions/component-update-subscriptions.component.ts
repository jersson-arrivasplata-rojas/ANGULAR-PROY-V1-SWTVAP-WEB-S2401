import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { SubscriptionHttp } from 'src/app/shared/http/subscriptions.http';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { emailDomainValidator } from 'src/app/shared/validators/email-domain.validators';

@Component({
  selector: 'app-component-update-subscriptions',
  templateUrl: './component-update-subscriptions.component.html',
  styleUrls: ['./component-update-subscriptions.component.scss'],
})
export class ComponentUpdateSubscriptionsComponent implements OnInit, OnChanges {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private subscriptionHttp: SubscriptionHttp
  ) {
    this.itemForm = this.formBuilder.group({
      email: ['', [Validators.required, emailDomainValidator()]],
      subscribedAt: ['', [Validators.required, Validators.pattern(PatternEnum.DATE)]],
      status: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.itemForm.patchValue(this.item);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item.status = CommonUtils.fromStatusText(this.item.status);
      this.itemForm.patchValue(this.item);
    }
  }

  update() {
    if (this.itemForm.valid) {
      const item = { ...this.item, ...this.itemForm.value };
      item.status = Number(item.status);
      this.subscriptionHttp.update(item.newsletterSubscriptionId, item).subscribe((item) => {
        this.updated.emit(item);
        (window as any).success("¡Actualizado!");
      });
    }
  }
}
