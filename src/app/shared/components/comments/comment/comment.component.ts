import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShareDataService } from 'src/app/shared/services/share-data.service';
import { CommonUtils } from 'src/app/shared/utils/common.utils';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Input() comment: any;
  @Input() product: any;

  comments: any[] = [
    // Tu lista de comentarios aqu\u00ED
  ];
  commentTree: any[];

  itemForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private shareDataService: ShareDataService) {
    this.itemForm = this.formBuilder.group({
      comment: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  add(comment: any) {
    if (this.itemForm.valid) {
      const item = { ...this.init(), ...this.itemForm.value };
      item.type = comment.type === 1 ? 0 : 1;
      item.productId = comment.productId;
      item.replyCommentId = comment.commentId;
      item.status = 1;
      this.shareDataService.add({ item, add: true });
    }
  }

  delete(comment: any) {
    this.shareDataService.add({ comment, delete: true });
  }

  init() {
    return {
      productId: '',
      replyCommentId: '',
      comment: '',
      type: '',
      name: '',
      status: 1,
      commentAt: CommonUtils.getDayNow(),
      createdAt: CommonUtils.getDayNow(),
      deletedAt: null
    };
  }
}
