import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UnitHttp } from 'src/app/shared/http/units.http';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'swtvap-component-list-units',
  templateUrl: './component-list-units.component.html',
  styleUrls: ['./component-list-units.component.scss'],
})
export class ComponentListUnitsComponent {
  @Input() data: any[] = [];
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();

  item: any;

  showItem = false;

  constructor(private unitHttp: UnitHttp) {}

  show(item: any) {
    if (item.unitId === this.item?.unitId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }
    this.unitHttp.getById(item.unitId).subscribe((response) => {
      this.item = response;
      if (!this.showItem) this.showItem = !this.showItem;
      this.showed.emit({item: this.item, showItem: this.showItem});
    });
  }

  async delete(item: any) {
    let text = '¡Presiona el bot\xf3n para eliminar!';
    if (await confirm(text) === true) {
      this.unitHttp.delete(item.unitId).subscribe(() => {
        item.deleted = true;
        this.data = this.data.map((f) => {
          if (f.unitId === item.unitId) {
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
