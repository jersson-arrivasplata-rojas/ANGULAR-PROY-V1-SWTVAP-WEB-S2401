import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnalyticHttp } from 'src/app/shared/http/analytics.http';

@Component({
  selector: 'app-component-update-analytics',
  templateUrl: './component-update-analytics.component.html',
  styleUrls: ['./component-update-analytics.component.scss'],
})
export class ComponentUpdateAnalyticsComponent implements OnInit, OnChanges {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() revoke: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};

  itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private analyticHttp: AnalyticHttp
  ) {
    this.itemForm = this.formBuilder.group({
      visitedPage: ['', Validators.required],
      visitedDate: ['', Validators.required]
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
      this.analyticHttp.update(item.analyticId, item).subscribe((item) => {
        this.updated.emit(item);
      });
    }
  }
}
