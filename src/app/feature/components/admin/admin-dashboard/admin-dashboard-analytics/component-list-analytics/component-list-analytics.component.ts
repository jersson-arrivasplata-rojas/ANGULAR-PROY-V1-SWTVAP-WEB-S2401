import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnalyticHttp } from 'src/app/shared/http/analytics.http';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'app-component-list-analytics',
  templateUrl: './component-list-analytics.component.html',
  styleUrls: ['./component-list-analytics.component.scss'],
})
export class ComponentListAnalyticsComponent {
  @Input() data: any[] = [];
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();

  item: any;

  showItem = false;
  searchTerm = '';

  constructor(private analyticHttp: AnalyticHttp) {}

  show(item: any) {
    if (item.analyticId === this.item?.analyticId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }
    this.analyticHttp.getById(item.analyticId).subscribe((response) => {
      this.item = response;
      if (!this.showItem) this.showItem = !this.showItem;
      this.showed.emit({item: this.item, showItem: this.showItem});
    });
  }

  async delete(item: any) {
    let text = '¡Presiona el bot\xf3n para eliminar!';
    if (await confirm(text) === true) {
      this.analyticHttp.delete(item.analyticId).subscribe(() => {
        item.deleted = true;
        this.data = this.data.map((f) => {
          if (f.analyticId === item.analyticId) {
            item.deletedAt = CommonUtils.getDayNow();
            return item;
          }
          return f;
        });
        this.deleted.emit(this.data);
        (window as any).success('¡Eliminado!');
      });
    }
  }

  update(item: any) {
    this.updated.emit(item);
  }
}
