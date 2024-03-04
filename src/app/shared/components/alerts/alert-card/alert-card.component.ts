import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swtvap-alert-card',
  templateUrl: './alert-card.component.html',
  styleUrls: ['./alert-card.component.scss']
})
export class AlertCardComponent implements OnInit {
  @Input() claseClose: string ;
  @Input() claseAlert: string ;
  @Input() contenido: string ;
  @Input() tipo: string ;
  constructor() { }

  ngOnInit(): void {
  }

}
