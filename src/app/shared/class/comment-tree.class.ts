import { CommonUtils } from "../utils/common.utils";

export class CommentTree {
  constructor(private comments: any[]) { }

  buildTree(): any[] {
    const commentMap = new Map<number, any>();
    const rootComments: any[] = [];

    // Construir un mapa de comentarios usando commentId como clave
    this.comments.forEach(comment => {
      commentMap.set(comment.commentId, comment);
    });

    // Organizar los comentarios en una estructura de \u00E1rbol
    this.comments.forEach(comment => {
      if (comment.replyCommentId !== null) {
        const parentComment = commentMap.get(comment.replyCommentId);
        if (parentComment) {
          if (!parentComment.children) {
            parentComment.children = [];
          }
          parentComment.children.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
    });

    return rootComments;
  }

  public getArrayOfStructure() {
    return this.comments.map(item => {
      delete item.children;
      return this.getNewItem(item);
    });
  }

  public getNewItem(item: any) {
    const data = {
      commentId: item.commentId,
      productId: item.productId,
      replyCommentId: item.replyCommentId,
      comment: item.comment,
      type: item.type,
      name: item.name,
      status: item.status,
      commentDate: CommonUtils.getDayNow(),
      createdDate: CommonUtils.getDayNow(),
      deletedDate: null,
      product: item.product ? item.product : null,
    };
    return data;
  }
}
