import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { CommentTree } from 'src/app/shared/class/comment-tree.class';
import { StatusEnum } from 'src/app/shared/config/status.enum';
import { CommentHttp } from 'src/app/shared/http/comments.http';
import { ProductHttp } from 'src/app/shared/http/products.http';


@Component({
  selector: 'swtvap-admin-dashboard-comments',
  templateUrl: './admin-dashboard-comments.component.html',
  styleUrls: ['./admin-dashboard-comments.component.css']
})
export class AdminDashboardCommentsComponent implements OnInit {

  data: any[] = [];
  item = {};
  productId = 0;
  product;
  commentTree: any[];

  constructor(private commentHttp: CommentHttp, private productHttp: ProductHttp,
    private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        mergeMap(params => {
          this.productId = +params['id'];
          return this.productHttp.getById(this.productId);
        }),
        mergeMap(item => {
          this.product = item;
          return this.commentHttp.getAll();
        }),
      ).subscribe((commentsData) => {
        this.data = commentsData.filter((comment) => comment.productId === this.productId);;
        const commentTree = new CommentTree(this.data);
        this.commentTree = commentTree.buildTree();

      });
  }

  handleTableAdded(item: any) {
    this.commentHttp.add(item).subscribe((data) => {
      this.data = new CommentTree(this.data).getArrayOfStructure();
      data.status = Boolean(data.status === StatusEnum.ACTIVE);
      this.data.push(data);
      const commentTree = new CommentTree(this.data);
      this.commentTree = commentTree.buildTree();
      (window as any).success("¡Guardado!");
    });
  }

  handleTableDeleted(commentsData: any[]) {
    this.data = new CommentTree(commentsData).getArrayOfStructure();
    const commentTree = new CommentTree(commentsData);
    this.commentTree = commentTree.buildTree();
  }

  back() {
    this.router.navigate([`/admin/dashboard/products`]);
  }
}
