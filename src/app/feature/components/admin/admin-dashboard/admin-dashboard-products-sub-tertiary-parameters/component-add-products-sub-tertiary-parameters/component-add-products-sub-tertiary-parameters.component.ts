import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-component-add-products-sub-tertiary-parameters',
  templateUrl: './component-add-products-sub-tertiary-parameters.component.html',
  styleUrls: ['./component-add-products-sub-tertiary-parameters.component.scss'],
})
export class ComponentAddProductsSubTertiaryParametersComponent implements OnChanges {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();

  @Input() properties: any;

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      parentId: ['', Validators.required],
      groupId: [''],
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
    // Verifica si la propiedad 'properties' ha cambiado
    if (changes.properties && changes.properties.currentValue) {
      // Actualiza el formulario seg&uacute;n los nuevos valores de 'properties'
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
      value1: '',
      value2: '',
      code: '',
      position: '',
      status: false
    };
  }
}
