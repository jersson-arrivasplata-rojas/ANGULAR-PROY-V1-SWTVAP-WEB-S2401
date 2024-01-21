import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationHttp } from 'src/app/shared/http/authorization.http';
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

  constructor(private router: Router,
    private authorizationHttp: AuthorizationHttp) { }

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


    /*this.authorizationHttp.addCart(this.products_id,((inputProductId.value=='')?1:inputProductId.value),this.store,this.type)
    .subscribe(
    ( response:HttpResponse<any> ) => {

      if(response.status == 200){
        //console.log(response);
        this.alerProduct=false;

        //this.alert.nativeElement.classList.remove('d-none');
        //alertProductId.classList.remove('d-none');
        this.emitEvent.emit(response.body.content);
        this.emitAlertEvent.emit({
          response: true,
          id: this.id,
          data:this.alert.nativeElement
        });

      }
    },
    ( response:HttpErrorResponse ) => {
      //console.log(response);
      //var message = (typeof response.error.message=='undefined')?'¡Sucedio un error inesperado!':response.error.message;


    },
    () =>{
        spinnerCartId.classList.remove('d-none');
        spinnerProductId.classList.add('d-none');
        let self = this;
        setTimeout(function(){
          if(self.type==0){
            inputProductId.value='';
          }
        },3000);

        setTimeout(function(){
          if(self.alert.nativeElement.classList.contains('d-none')==true){//.remove('d-none');
            //self.alert.nativeElement.classList.remove('d-none');
            alertProductId.classList.remove('d-none');
          }
        },2000);
    });
*/
  }
}
