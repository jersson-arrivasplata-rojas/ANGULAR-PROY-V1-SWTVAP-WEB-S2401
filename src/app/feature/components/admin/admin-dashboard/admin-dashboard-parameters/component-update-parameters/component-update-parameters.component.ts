import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterHttp } from 'src/app/shared/http/parameters.http';

@Component({
  selector: 'swtvap-component-update-parameters',
  templateUrl: './component-update-parameters.component.html',
  styleUrls: ['./component-update-parameters.component.scss'],
})
export class ComponentUpdateParametersComponent implements OnInit, OnChanges {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private parameterHttp: ParameterHttp
  ) {
    this.itemForm = this.formBuilder.group({
      parentId: [null],
      groupId: ['', Validators.required],
      description: ['', Validators.required],
      position: [null],
      value: ['', Validators.required],
      value1: [''],
      value2: [''],
      code: [null, Validators.maxLength(50)],
      status: [false, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.itemForm.patchValue(this.item);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item.status = Boolean(this.item.status);
      this.itemForm.patchValue(this.item);
    }
  }

  update() {
    if (this.itemForm.valid) {
      const item = { ...this.item, ...this.itemForm.value };
      item.status = Number(item.status);
      this.parameterHttp.update(item.id, item).subscribe((item) => {
        this.updated.emit(item);
        (window as any).success("¡Actualizado!");
      });
    }
  }
}
