import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'swtvap-component-add-marketing-campaigns',
  templateUrl: './component-add-marketing-campaigns.component.html',
  styleUrls: ['./component-add-marketing-campaigns.component.scss'],
})
export class ComponentAddMarketingCampaignsComponent {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      startDate: [CommonUtils.getDayNow(), [Validators.required, Validators.pattern(PatternEnum.DATE)]],
      endDate: [CommonUtils.getDayNow(), [Validators.required, Validators.pattern(PatternEnum.DATE)]],
      description: ['']
    });
  }

  add() {
    if (this.itemForm.valid) {
      const item = { ...this.init(), ...this.itemForm.value };
      this.added.emit(item);
    }
  }

  init() {
    return {
      name: '',
      startDate: '',
      endDate: '',
      description: ''
    };
  }
}
