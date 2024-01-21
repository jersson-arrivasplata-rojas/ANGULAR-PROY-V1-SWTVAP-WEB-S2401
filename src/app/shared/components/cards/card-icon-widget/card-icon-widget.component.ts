import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-icon-widget',
  templateUrl: './card-icon-widget.component.html',
  styleUrls: ['./card-icon-widget.component.scss']
})
export class CardIconWidgetComponent implements OnInit {
  @Input() titulo: string;
  @Input() cantidad: string;
  @Input() icono: string;
  @Input() tipo: string;
  @Input() clase: string='';
  @Input() block: string='';

  constructor() { }

  ngOnInit(): void {

  }

}
