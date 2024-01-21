import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-default',
  templateUrl: './contact-default.component.html',
  styleUrls: ['./contact-default.component.scss']
})
export class ContactDefaultComponent implements OnInit {
  @Input() name: string;
  @Input() address: string;
  @Input() celphone: string;
  @Input() email: string;
  @Input() url: string;


  constructor() { }

  ngOnInit(): void {
  }

}
