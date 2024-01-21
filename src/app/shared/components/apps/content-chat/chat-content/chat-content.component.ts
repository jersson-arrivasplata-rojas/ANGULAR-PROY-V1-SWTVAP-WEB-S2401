import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss']
})
export class ChatContentComponent implements OnInit {
  @Input() content: {
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
  constructor() { }

  ngOnInit(): void {
  }
  saveFile(){
    document.getElementById('FileUpload').click()
  }
}

/*
= {
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
    };
*/
