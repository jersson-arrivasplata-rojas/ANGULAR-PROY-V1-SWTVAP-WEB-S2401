import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swtvap-description-default',
  templateUrl: './description-default.component.html',
  styleUrls: ['./description-default.component.scss']
})
export class DescriptionDefaultComponent implements OnInit {
  @Input() title: string; // = ''
  @Input() description: string; // = ''
  @Input() activateTitle: string = 'true'; // = ''

  constructor() { }

  ngOnInit(): void {
  }

}
