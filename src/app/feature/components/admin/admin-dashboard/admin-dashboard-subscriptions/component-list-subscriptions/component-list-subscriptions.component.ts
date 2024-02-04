import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SubscriptionHttp } from 'src/app/shared/http/subscriptions.http';

@Component({
  selector: 'app-component-list-subscriptions',
  templateUrl: './component-list-subscriptions.component.html',
  styleUrls: ['./component-list-subscriptions.component.scss'],
})
export class ComponentListSubscriptionsComponent {
  @Input() data: any[] = [];
  @Output() updated: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() showed: EventEmitter<any> = new EventEmitter();

  item: any;

  showItem = false;

  constructor(private subscriptionHttp: SubscriptionHttp) {}

  show(item: any) {
    if (item.newsletterSubscriptionId === this.item?.newsletterSubscriptionId && this.showItem) {
      this.showItem = !this.showItem;
      return;
    }
    this.subscriptionHttp.getById(item.newsletterSubscriptionId).subscribe((response) => {
      this.item = response;
      if (!this.showItem) this.showItem = !this.showItem;
      this.showed.emit({item: this.item, showItem: this.showItem});
    });
  }

  delete(item: any) {
    let text = 'Presiona el bot\xf3n para eliminar! ';
    if (confirm(text) === true) {
      this.subscriptionHttp.delete(item.newsletterSubscriptionId).subscribe(() => {
        item.deleted = true;
        this.data = this.data.filter((f) => f.newsletterSubscriptionId !== item.newsletterSubscriptionId);
        this.deleted.emit(this.data);
      });
    }
  }

  update(item: any) {
    this.updated.emit(item);
  }
}
