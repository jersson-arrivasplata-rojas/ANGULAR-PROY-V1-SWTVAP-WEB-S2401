import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { ProviderHttp } from 'src/app/shared/http/providers.http';

@Component({
  selector: 'app-component-update-providers',
  templateUrl: './component-update-providers.component.html',
  styleUrls: ['./component-update-providers.component.scss'],
})
export class ComponentUpdateProvidersComponent implements OnInit, OnChanges {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private providerHttp: ProviderHttp
  ) {

    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(PatternEnum.NUMBER)]],
      cellphone: ['', [Validators.required, Validators.pattern(PatternEnum.NUMBER)]],
      countryCode: ['', [Validators.required, Validators.pattern(PatternEnum.NUMBER_PLUS)]],
      email: ['', [Validators.required, Validators.email]],
      whatsapp: [false, Validators.required],
      details: ['', Validators.required],
      otherDetails: [''],
      status: [false, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.itemForm.patchValue(this.item);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item.whatsapp = Boolean(this.item.whatsapp);
      this.item.status = Boolean(this.item.status);
      this.itemForm.patchValue(this.item);
    }
  }

  update() {
    if (this.itemForm.valid) {
      const item = { ...this.item, ...this.itemForm.value };
      item.whatsapp = Number(item.whatsapp);
      item.status = Number(item.status);
      this.providerHttp.update(item.providerId, item).subscribe((item) => {
        this.updated.emit(item);
      });
    }
  }
}
