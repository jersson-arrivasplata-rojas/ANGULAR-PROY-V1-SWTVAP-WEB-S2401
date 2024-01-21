import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-raised',
  templateUrl: './button-raised.component.html',
  styleUrls: ['./button-raised.component.scss']
})
export class ButtonRaisedComponent implements OnInit {
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
