import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogHttp } from 'src/app/shared/http/catalogs.http';

@Component({
  selector: 'swtvap-component-update-catalogs',
  templateUrl: './component-update-catalogs.component.html',
  styleUrls: ['./component-update-catalogs.component.scss'],
})
export class ComponentUpdateCatalogsComponent implements OnInit, OnChanges {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private catalogHttp: CatalogHttp
  ) {
    this.itemForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      name_en: [''],
      code: ['', [Validators.required, Validators.maxLength(50)]],
      description: [null],
      description_en: [null],
      lang: ['ES', [Validators.required]],
      status: ['ACTIVE', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.itemForm.patchValue(this.item);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.itemForm.patchValue(this.item);
    }
  }

  update() {
    if (this.itemForm.valid) {
      const item = { ...this.item, ...this.itemForm.value };
      this.catalogHttp.update(item.catalogId, item).subscribe((item) => {
        this.updated.emit(item);
        (window as any).success("¡Actualizado!");
      });
    }
  }
}
