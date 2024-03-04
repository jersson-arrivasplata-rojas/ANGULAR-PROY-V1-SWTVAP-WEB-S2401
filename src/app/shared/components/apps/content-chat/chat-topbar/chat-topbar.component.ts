import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swtvap-chat-topbar',
  templateUrl: './chat-topbar.component.html',
  styleUrls: ['./chat-topbar.component.scss']
})
export class ChatTopbarComponent implements OnInit {
  @Input() name: string;
  @Input() url: string;
  constructor() { }

  ngOnInit(): void {
  }

}
