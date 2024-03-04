import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swtvap-card-mt-seller',
  templateUrl: './card-mt-seller.component.html',
  styleUrls: ['./card-mt-seller.component.scss']
})
export class CardMtSellerComponent implements OnInit {

  @Input() contenido: {
    title: string;
    priceTitle: string;
    subTitleOne: string;
    quantityOne: string;
    subTitleSecond: string;
    priceSecond: string;
  };

  constructor() { }

  ngOnInit(): void {

  }

}
  /*@Input() title: string;
  @Input() priceTitle: string;

  @Input() subTitleOne: string;
  @Input() quantityOne: string;

  @Input() subTitleSecond: string;
  @Input() priceSecond: string;*/
