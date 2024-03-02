import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
//Component, OnInit, Input, Output,
@Component({
  selector: 'app-cart-inicio',
  templateUrl: './cart-inicio.component.html',
  styleUrls: ['./cart-inicio.component.css']
})
export class CartInicioComponent implements OnInit {

  @Input() content;
  @Input() products_id;
  @Input() store;
  @Input() quantity='';
  @Input() type = 0;
  @Output() emitEvent = new EventEmitter();
  @Output() emitAlertEvent = new EventEmitter<{
    response:boolean,
    id:string,
    data: ElementRef
  }>();
  public id:string;
  @ViewChild('alert') alert:ElementRef;
  public alerProduct:boolean = false;
  //@Output() emitEvent = new EventEmitter<any>(); : EventEmitter<any>

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.id = `alert-product-${this.content}-${this.products_id}`;
  }

  addCart($event){
    //console.log(this.alert);
    let alertProductId=document.getElementById(`alert-product-${this.content}-${this.products_id}`);
    let inputProductId:any=document.getElementById(`input-product-${this.content}-${this.products_id}`);
    let spinnerProductId:any = document.getElementById(`spinner-product-${this.content}-${this.products_id}-i`);
    let spinnerCartId:any = document.getElementById(`spinner-cart-${this.content}-${this.products_id}-i`);

    if(inputProductId.value=='') inputProductId.value=1;
    spinnerCartId.classList.add('d-none');
    spinnerProductId.classList.remove('d-none');



  }
}
