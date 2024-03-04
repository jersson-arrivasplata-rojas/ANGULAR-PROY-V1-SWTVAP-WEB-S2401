import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swtvap-chat-message-left',
  templateUrl: './chat-message-left.component.html',
  styleUrls: ['./chat-message-left.component.scss']
})
export class ChatMessageLeftComponent implements OnInit {
  @Input() name: string;
  @Input() url: string;
  @Input() message: string;
  @Input() time: string;
  constructor() { }

  ngOnInit(): void {
  }

}
