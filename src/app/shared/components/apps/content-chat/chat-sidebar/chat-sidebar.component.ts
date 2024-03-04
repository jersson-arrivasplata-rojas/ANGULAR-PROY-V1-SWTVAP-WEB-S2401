import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swtvap-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.scss']
})
export class ChatSidebarComponent implements OnInit {
  @Input() contacts: {
    name: string;
    url: string;
    status: string;
  }[];
  constructor() { }

  ngOnInit(): void {
  }
}

/*
@Input() name: string; // = ''
@Input() url: string; // = ''
@Input() status: string; // = ''
*/
/* = [
  {
    name: 'Jhone Will',
    url: '../assets/images/faces/3.jpg',
    status: 'online',
  },
  {
    name: 'Jhone Smit',
    url: '../assets/images/faces/2.jpg',
    status: 'online',
  },
  {
    name: 'Jhone Leonard',
    url: '../assets/images/faces/4.jpg',
    status: '',
  }
];*/
