import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogHttp } from 'src/app/shared/http/catalogs.http';

@Component({
  selector: 'app-component-update-catalogs',
  templateUrl: './component-update-catalogs.component.html',
  styleUrls: ['./component-update-catalogs.component.scss'],
})
export class ComponentUpdateCatalogsComponent implements OnInit {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private catalogHttp: CatalogHttp
  ) {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
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
      this.catalogHttp.update(item.catalogId, item).subscribe((item) => {
        this.updated.emit(item);
      });
    }
  }
}
