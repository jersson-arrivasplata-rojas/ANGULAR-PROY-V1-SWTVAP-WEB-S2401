import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swtvap-chat-contact',
  templateUrl: './chat-contact.component.html',
  styleUrls: ['./chat-contact.component.scss']
})
export class ChatContactComponent implements OnInit {
  @Input() name: string; // = ''
  @Input() url: string; // = ''
  @Input() status: string; // = ''

  constructor() { }

  ngOnInit(): void {
  }

}
