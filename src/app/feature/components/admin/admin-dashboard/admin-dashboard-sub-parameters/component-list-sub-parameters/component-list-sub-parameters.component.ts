import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ParameterHttp } from 'src/app/shared/http/parameters.http';

@Component({
  selector: 'app-component-list-sub-parameters',
  templateUrl: './component-list-sub-parameters.component.html',
  styleUrls: ['./component-list-sub-parameters.component.scss'],
})
export class ComponentListSubParametersComponent {
  @Input() data: any[] = [];
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();
  @Output() added: EventEmitter<any> = new EventEmitter();

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

  delete(item: any) {
    let text = '¡Presiona el bot\xf3n para eliminar!';
    if (confirm(text) === true) {
      this.parameterHttp.delete(item.id).subscribe(() => {
        item.deleted = true;
        this.data = this.data.filter((f) => f.id !== item.id);
        this.deleted.emit(this.data);
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
