import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-component-add-sub-secondary-parameters',
  templateUrl: './component-add-sub-secondary-parameters.component.html',
  styleUrls: ['./component-add-sub-secondary-parameters.component.scss'],
})
export class ComponentAddSubSecondaryParametersComponent implements OnChanges {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();

  @Input() properties: any;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      parentId: ['', Validators.required],
      groupId: ['', Validators.required],
      description: ['', Validators.required],
      value: ['', Validators.required],
      code: [null],
      position: [null],
      status: [false, [Validators.required]]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // Verifica si la propiedad 'properties' ha cambiado
    if (changes.properties && changes.properties.currentValue) {
      // Actualiza el formulario según los nuevos valores de 'properties'
      this.itemForm.patchValue({ parentId: this.properties.idParentParameter });
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
      code: '',
      position: '',
      status: false
    };
  }
}
