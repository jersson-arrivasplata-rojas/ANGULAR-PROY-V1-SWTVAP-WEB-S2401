import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-default',
  templateUrl: './chat-default.component.html',
  styleUrls: ['./chat-default.component.scss']
})

export class ChatDefaultComponent implements OnInit {
  @Input() body: {
    contacts: {
      name: string;
      url: string;
      status: string;
    }[];
    content: {
      principal: {
        name: string;
        url: string;
        id: number;
      };
      secundary: {
        name: string;
        url: string;
        id: number;
      };
      message: {
        name: string;
        url: string;
        message: string;
        time: string;
        direction: number;
        id: number;
      }[];
    };
  } = {
      contacts: [
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
      ],
      content: {
        principal: {
          name: 'Jhone Will',
          url: '../assets/images/faces/3.jpg',
          id: 1,
        },
        secundary: {
          name: 'Jhone Smit',
          url: '../assets/images/faces/2.jpg',
          id: 2,
        },
        message: [
          {
            name: 'Jhone Will',
            url: '../assets/images/faces/3.jpg',
            message: 'Do you ever find yourself falling into the “discount trap?',
            time: '25 min ago',
            direction: 1,
            id: 1
          },
          {
            name: 'Jhone Smit',
            url: '../assets/images/faces/2.jpg',
            message: 'Lorem ipsum dolor sit amet.',
            time: '24 min ago',
            direction: 0,
            id: 2
          },
          {
            name: 'Jhone Will',
            url: '../assets/images/faces/3.jpg',
            message: 'Lorem ipsum dolor sit amet.',
            time: '23 min ago',
            direction: 1,
            id: 1
          }
        ]
      }
    };
  constructor() { }

  ngOnInit(): void {
  }

}
