import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { ProviderHttp } from 'src/app/shared/http/providers.http';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { emailDomainValidator } from 'src/app/shared/validators/email-domain.validators';

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
      name: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      phone: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(PatternEnum.NUMBER)]],
      cellphone: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(PatternEnum.NUMBER)]],
      countryCode: ['', [Validators.required, Validators.maxLength(5), Validators.pattern(PatternEnum.NUMBER_PLUS)]],
      email: ['', [Validators.required, Validators.maxLength(50), emailDomainValidator()]],
      whatsapp: [false, Validators.required],
      details: [''],
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
      this.item.status = CommonUtils.fromStatusText(this.item.status);
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
        (window as any).success("¡Actualizado!");
      });
    }
  }
}
