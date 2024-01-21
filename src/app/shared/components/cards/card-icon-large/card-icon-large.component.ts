import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-icon-large',
  templateUrl: './card-icon-large.component.html',
  styleUrls: ['./card-icon-large.component.scss']
})
export class CardIconLargeComponent implements OnInit {
  @Input() titulo: string;
  @Input() cantidad: string;
  @Input() icono: string;
  @Input() tipo: string;
  @Input() clase: string='';
  constructor() { }

  ngOnInit(): void {
  }

}
