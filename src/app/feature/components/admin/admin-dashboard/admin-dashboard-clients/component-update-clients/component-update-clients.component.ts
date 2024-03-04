import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { ClientHttp } from 'src/app/shared/http/clients.http';
import { emailDomainValidator } from 'src/app/shared/validators/email-domain.validators';

@Component({
  selector: 'swtvap-component-update-clients',
  templateUrl: './component-update-clients.component.html',
  styleUrls: ['./component-update-clients.component.scss'],
})
export class ComponentUpdateClientsComponent implements OnInit, OnChanges {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clientHttp: ClientHttp
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
      sourceAggregate: ['ADMINISTRATIVE_SYSTEM', Validators.required]
    });
  }

  ngOnInit(): void {
    this.itemForm.patchValue(this.item);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && changes['item'].currentValue) {
      this.item.whatsapp = Boolean(this.item.whatsapp);
      this.itemForm.patchValue(this.item);
    }
  }

  update() {
    if (this.itemForm.valid) {
      const item = { ...this.item, ...this.itemForm.value };
      item.whatsapp = Number(item.whatsapp);
      this.clientHttp.update(item.clientId, item).subscribe((item) => {
        this.updated.emit(item);
        (window as any).success("¡Actualizado!");
      });
    }
  }
}
