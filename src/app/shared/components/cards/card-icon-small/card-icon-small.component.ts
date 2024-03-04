import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swtvap-card-icon-small',
  templateUrl: './card-icon-small.component.html',
  styleUrls: ['./card-icon-small.component.scss']
})
export class CardIconSmallComponent implements OnInit {
  @Input() cantidad: string;
  @Input() icono: string;
  @Input() tipo: string;
  @Input() claseprincipal: string;

  constructor() { }

  ngOnInit(): void {
  }

}
