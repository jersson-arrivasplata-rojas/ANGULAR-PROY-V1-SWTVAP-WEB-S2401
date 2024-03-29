import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swtvap-card-icon-medium',
  templateUrl: './card-icon-medium.component.html',
  styleUrls: ['./card-icon-medium.component.scss']
})
export class CardIconMediumComponent implements OnInit {
  @Input() titulo: string;
  @Input() cantidad: string;
  @Input() icono: string;
  @Input() tipo: string;
  @Input() claseprincipal: string;

  constructor() { }

  ngOnInit(): void {
  }

}
