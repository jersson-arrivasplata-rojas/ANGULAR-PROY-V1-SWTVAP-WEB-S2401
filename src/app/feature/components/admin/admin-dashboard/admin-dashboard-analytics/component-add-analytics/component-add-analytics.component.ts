import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'swtvap-component-add-analytics',
  templateUrl: './component-add-analytics.component.html',
  styleUrls: ['./component-add-analytics.component.scss'],
})
export class ComponentAddAnalyticsComponent {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      visitedPage: ['', [Validators.required, Validators.maxLength(200)]],
      visitedDate: [CommonUtils.getDayNow(), [Validators.required, Validators.pattern(PatternEnum.DATE)]]
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
      visitedPage: '',
      visitedDate: ''
    };
  }
}
