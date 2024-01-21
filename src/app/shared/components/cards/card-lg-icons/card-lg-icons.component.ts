import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-lg-icons',
  templateUrl: './card-lg-icons.component.html',
  styleUrls: ['./card-lg-icons.component.scss']
})
export class CardLgIconsComponent implements OnInit {

  @Input() content: {
    quantity: string;
    icon: string;
    title: string;
    textColor: string;
    iconColor: string;
   }[];

  constructor() { }

  ngOnInit(): void {
  }

  get size(): number{
    return this.content.length;
  }
  get sizeArray(): string[]{
    return new Array(this.size);
  }

  getClasses() {
    let size = this.content.length;
    if(size == 6){
      return 'col-lg-2 col-md-3 col-sm-2 col-12';
    }else if(size == 4){
      return 'col-lg-3 col-md-3 col-sm-3 col-12';
    }else if(size == 3){
      return 'col-lg-4 col-md-4 col-sm-4 col-12';
    }else if(size == 2){
      return 'col-lg-6 col-md-6 col-sm-6 col-12';
    }else if(size == 1){
      return 'col-lg-12 col-md-12 col-sm-12 col-12';
    }
    return '';
  }
  //sizeArray
}
/*
= [
    {
      quantity: '265',
      icon: 'i-Eye',
      title: 'Visitas'
    },
    {
      quantity: '3',
      icon: 'i-Receipt-3',
      title: 'Ordenes Finalizadas'
    },
    {
      quantity: '1',
      icon: 'i-Eye',
      title: 'Clientes'
    }
  ]
*/
