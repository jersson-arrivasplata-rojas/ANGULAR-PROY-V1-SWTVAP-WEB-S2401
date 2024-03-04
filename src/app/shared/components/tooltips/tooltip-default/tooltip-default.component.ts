import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swtvap-tooltip-default',
  templateUrl: './tooltip-default.component.html',
  styleUrls: ['./tooltip-default.component.scss']
})
export class TooltipDefaultComponent implements OnInit {
  @Input() tipo: string ;
  @Input() title: string ;
  @Input() direction: string ;
  @Input() claseTooltip: string;
  constructor() { }

  ngOnInit(): void {
  }

}
