import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientHttp } from 'src/app/shared/http/clients.http';

@Component({
  selector: 'app-component-update-clients',
  templateUrl: './component-update-clients.component.html',
  styleUrls: ['./component-update-clients.component.scss'],
})
export class ComponentUpdateClientsComponent implements OnInit {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clientHttp: ClientHttp
  ) {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      cellphone: ['', Validators.required],
      countryCode: ['', Validators.required],
      email: ['', Validators.required],
      whatsapp: [false, Validators.required],
      details: ['', Validators.required],
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
      });
    }
  }
}
