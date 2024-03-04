import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swtvap-button-outline',
  templateUrl: './button-outline.component.html',
  styleUrls: ['./button-outline.component.scss']
})
export class ButtonOutlineComponent implements OnInit {
  @Input() tipo: string ;
  @Input() title: string ;
  @Input() icono: string = 'i-Gear-2';
  @Input() claseButton: string;
  @Input() claseI: string;
  @Input() hex: string;
  constructor() { }

  ngOnInit(): void {
  }

}
