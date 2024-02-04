import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-component-add-subscriptions',
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
      email: ['', Validators.required],
      subscribedAt: ['', Validators.required],
      status: [false, Validators.required]
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
