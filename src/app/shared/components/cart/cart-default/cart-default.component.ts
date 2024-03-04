import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'swtvap-cart-default',
  templateUrl: './cart-default.component.html',
  styleUrls: ['./cart-default.component.css']
})
export class CartDefaultComponent implements OnInit {

  @Input() url;  
  @Input() price:string;

  
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  addCart(){
    
    this.router.navigate([this.url,'carrito']);

  }
  closeCart(){

  }
}
