import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'swtvap-component-add-sub-parameters',
  templateUrl: './component-add-sub-parameters.component.html',
  styleUrls: ['./component-add-sub-parameters.component.scss'],
})
export class ComponentAddSubParametersComponent implements OnChanges {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() parentId;
  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      parentId: ['', Validators.required],
      groupId: [null],
      description: ['', Validators.required],
      value: ['', Validators.required],
      value1: [''],
      value2: [''],
      code: [null, Validators.maxLength(50)],
      position: [null],
      status: [true, [Validators.required]]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.parentId && changes.parentId.currentValue) {
      this.itemForm.patchValue({ parentId: this.parentId });
    }
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
      parentId: '',
      groupId: '',
      description: '',
      value: '',
      value1: '',
      value2: '',
      code: '',
      position: '',
      status: false
    };
  }
}
