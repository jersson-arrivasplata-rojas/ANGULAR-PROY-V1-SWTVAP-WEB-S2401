import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentHttp } from 'src/app/shared/http/comments.http';
import { ShareDataService } from 'src/app/shared/services/share-data.service';

@Component({
  selector: 'app-component-list-comments',
  templateUrl: './component-list-comments.component.html',
  styleUrls: ['./component-list-comments.component.scss'],
})
export class ComponentListCommentsComponent implements OnInit, OnChanges, OnDestroy {
  @Output() added: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Input() data: any[] = [];
  @Input() commentTree: any[] = [];
  @Input() productId;

  item: any;
  private subscription: Subscription = new Subscription();

  constructor(private commentHttp: CommentHttp, private shareDataService: ShareDataService) {}

  ngOnInit(): void {
    this.subscription.add(this.shareDataService.getData().subscribe((response) => {
      if (response) {
        if (response.delete) {
          this.delete(response.comment);
        }
        if (response.add) {
          this.added.emit(response.item);
        }
      }
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['commentTree'] && changes['commentTree'].currentValue) {
      this.commentTree = changes['commentTree'].currentValue;
      this.data = changes['data'].currentValue;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete(item: any) {
    let text = 'Presiona el bot\xf3n para eliminar! ';
    if (confirm(text) === true) {
      this.commentHttp.delete(item.commentId).subscribe(() => {
        this.data.filter((f) => f.commentId === item.commentId)
        .forEach((m) => {
          m.status = 0;
        });
        this.deleted.emit(this.data);
      });
    }
  }


}
