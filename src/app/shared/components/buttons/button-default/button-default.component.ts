import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swtvap-button-default',
  templateUrl: './button-default.component.html',
  styleUrls: ['./button-default.component.scss']
})
export class ButtonDefaultComponent implements OnInit {
  @Input() color: string ;
  @Input() title: string ;
  @Input() icono: string;
  @Input() claseButton: string;
  @Input() claseI: string;
  @Input() hex: string;


  constructor() { }

  ngOnInit(): void {
  }

}
