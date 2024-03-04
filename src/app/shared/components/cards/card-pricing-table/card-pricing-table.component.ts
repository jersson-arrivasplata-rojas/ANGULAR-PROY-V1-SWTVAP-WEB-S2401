import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swtvap-card-pricing-table',
  templateUrl: './card-pricing-table.component.html',
  styleUrls: ['./card-pricing-table.component.scss']
})
export class CardPricingTableComponent implements OnInit {
  @Input() color: string ;
  @Input() title: string ;
  @Input() price: string ;
  @Input() icon: string ;
  @Input() buttonText: string ='Adquirir';


  /**
   * @description ¡Cada cuanto tiempo significa howOften!
   */
  @Input() howOften: string ;
  @Input() description: {
      text: string;
      colorSpan: string;
      classLi: string;
      textSpan: string;
      activateSpan: boolean;
  }[]=[
    {
      text: 'E-mail accounts',
      colorSpan: 'danger',
      classLi: 't-font-bolder',
      textSpan: 'SI',
      activateSpan: true
    },
    {
      text: 'E-mail accounts',
      colorSpan: 'dark',
      classLi: 'text-mute',
      textSpan: 'NO',
      activateSpan: true
    },
    {
      text: 'E-mail accounts',
      colorSpan: 'danger',
      classLi: 't-font-bolder',
      textSpan: 'SI',
      activateSpan: true
    }
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
