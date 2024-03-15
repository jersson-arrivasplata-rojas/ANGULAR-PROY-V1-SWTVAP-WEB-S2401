import { Component } from '@angular/core';
import { CommentInInterface } from 'src/app/shared/interfaces/comment-in.inteface';

@Component({
  selector: 'swtvap-comment-in',
  templateUrl: './comment-in.component.html',
  styleUrls: ['./comment-in.component.scss']
})
export class CommentInComponent {
  comments: CommentInInterface[] = [
    {
      id: 1,
      author: 'John Doe',
      text: 'This is a comment',
      avatarUrl: 'https://via.placeholder.com/80x80',
      likes: 5,
      time: '2 hours ago',
      replies: [
        {
          id: 2,
          author: 'Jane Doe',
          text: 'This is a reply',
          avatarUrl: 'https://via.placeholder.com/80x80',
          likes: 3,
          time: '1 hour ago',
          replies: [] // Aquí pueden ir más respuestas
        }
      ]
    }
    // más comentarios aquí
  ];

  constructor() { }

  onReplyRequested(comment: CommentInInterface) {
    // Aquí puedes, por ejemplo, establecer el comentario actual al que se está respondiendo
    // y mostrar un formulario de respuesta global o cualquier otra lógica que necesites
  }
}