import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swtvap-chat-message-right',
  templateUrl: './chat-message-right.component.html',
  styleUrls: ['./chat-message-right.component.scss']
})
export class ChatMessageRightComponent implements OnInit {
  @Input() name: string;
  @Input() url: string;
  @Input() message: string;
  @Input() time: string;
  constructor() { }

  ngOnInit(): void {
  }

}
