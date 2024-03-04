import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { MarketingCampaignHttp } from 'src/app/shared/http/marketing-campaigns.http';

@Component({
  selector: 'swtvap-component-update-marketing-campaigns',
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
      name: ['', [Validators.required, Validators.maxLength(100)]],
      startDate: ['', [Validators.required, Validators.pattern(PatternEnum.DATE)]],
      endDate: ['', [Validators.required, Validators.pattern(PatternEnum.DATE)]],
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
        (window as any).success("¡Actualizado!");
      });
    }
  }
}
