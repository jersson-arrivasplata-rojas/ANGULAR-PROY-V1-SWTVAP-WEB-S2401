import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swtvap-alert-default',
  templateUrl: './alert-default.component.html',
  styleUrls: ['./alert-default.component.scss']
})
export class AlertDefaultComponent implements OnInit {

  @Input() claseClose: string ;
  @Input() claseAlert: string ;
  @Input() contenido: string ;
  @Input() tipo: string ;

  constructor() { }

  ngOnInit(): void {
  }

}
