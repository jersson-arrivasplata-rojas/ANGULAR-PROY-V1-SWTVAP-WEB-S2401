import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnitHttp } from 'src/app/shared/http/units.http';

@Component({
  selector: 'app-component-update-units',
  templateUrl: './component-update-units.component.html',
  styleUrls: ['./component-update-units.component.scss'],
})
export class ComponentUpdateUnitsComponent implements OnInit {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private unitHttp: UnitHttp
  ) {
    this.itemForm = this.formBuilder.group({
      unitName: ['', Validators.required],
      abbreviation: ['', Validators.required],
      conversionFactor: [''],
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
      this.unitHttp.update(item.unitId, item).subscribe((item) => {
        this.updated.emit(item);
      });
    }
  }
}
