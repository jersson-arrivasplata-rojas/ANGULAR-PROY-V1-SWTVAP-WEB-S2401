import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentInInterface } from 'src/app/shared/interfaces/comment-in.inteface';

@Component({
  selector: 'swtvap-comment-reply',
  templateUrl: './comment-reply.component.html',
  styleUrls: ['./comment-reply.component.scss']
})
export class CommentReplyComponent {
  @Input() active: boolean = false;
  @Input() comment: CommentInInterface;
  @Output() replyRequested = new EventEmitter<CommentInInterface>();
  @Output() replySubmitted = new EventEmitter<CommentInInterface>(); // Evento para cuando se envía una respuesta

  showReplyForm = false;

  newReplyText: string = ''; // Para almacenar el texto de la nueva respuesta

  constructor() { }

  replyToComment() {
    this.showReplyForm = true;
    this.active = false;
    this.replyRequested.emit(this.comment); // Si quieres manejar esto en el componente padre
  }

  submitReply() {
    if (this.newReplyText.trim()) {
      const newReply: CommentInInterface = {
        id: Date.now().toString(), // O cualquier otro método para generar un ID único
        author: 'Current User', // Reemplaza esto con la información del usuario actual
        text: this.newReplyText,
        avatarUrl: 'https://via.placeholder.com/80x80', // Reemplaza con la URL del avatar del usuario actual
        replies: [] // Inicializa las respuestas de la nueva respuesta (que probablemente estén vacías)
        ,
        likes: 0,
        time: ''
      };

      if (!this.comment.replies) {
        this.comment.replies = []; // Asegúrate de que haya una matriz de respuestas para agregar
      }

      this.comment.replies.push(newReply); // Agrega la nueva respuesta al comentario actual
      this.replySubmitted.emit(newReply); // Opcional: Emite el evento para informar al componente padre

      this.newReplyText = ''; // Limpia el campo de entrada
      this.showReplyForm = false; // Oculta el formulario de respuesta
      this.active = true;
    }
  }
}
