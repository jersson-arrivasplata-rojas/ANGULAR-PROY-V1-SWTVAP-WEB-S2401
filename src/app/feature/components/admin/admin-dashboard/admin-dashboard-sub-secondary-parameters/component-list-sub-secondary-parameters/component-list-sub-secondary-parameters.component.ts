import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ParameterHttp } from 'src/app/shared/http/parameters.http';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'app-component-list-sub-secondary-parameters',
  templateUrl: './component-list-sub-secondary-parameters.component.html',
  styleUrls: ['./component-list-sub-secondary-parameters.component.scss'],
})
export class ComponentListSubSecondaryParametersComponent {
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();
  @Output() added: EventEmitter<any> = new EventEmitter();

  @Input() data: any[] = [];
  @Input() parameter: any;
  @Input() properties:any;

  item: any;

  showItem = false;

  constructor(private parameterHttp: ParameterHttp) {}

  show(item: any) {
    if (item.id === this.item?.id && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }
    this.parameterHttp.getById(item.id).subscribe((response) => {
      this.item = response;
      if (!this.showItem) this.showItem = !this.showItem;
      this.showed.emit({item: this.item, showItem: this.showItem});
    });
  }

  async delete(item: any) {
    let text = '¡Presiona el bot\xf3n para eliminar!';
    if (await confirm(text) === true) {
      this.parameterHttp.delete(item.id).subscribe(() => {
        item.deleted = true;
        this.data = this.data.map((f) => {
          if (f.id === item.id) {
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

  add(item: any){
    this.added.emit(item);
  }
}
