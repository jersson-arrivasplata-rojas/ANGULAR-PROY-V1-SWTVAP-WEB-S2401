import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarketingCampaignHttp } from 'src/app/shared/http/marketing-campaigns.http';

@Component({
  selector: 'app-component-update-marketing-campaigns',
  templateUrl: './component-update-marketing-campaigns.component.html',
  styleUrls: ['./component-update-marketing-campaigns.component.scss'],
})
export class ComponentUpdateMarketingCampaignsComponent implements OnInit, OnChanges {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private marketingcampaignHttp: MarketingCampaignHttp
  ) {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['']
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
      this.marketingcampaignHttp.update(item.marketingCampaignId, item).subscribe((item) => {
        this.updated.emit(item);
      });
    }
  }
}