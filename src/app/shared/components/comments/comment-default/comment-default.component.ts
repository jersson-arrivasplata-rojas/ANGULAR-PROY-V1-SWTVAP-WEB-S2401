import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthorizationHttp } from 'src/app/shared/http/authorization.http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment-default',
  templateUrl: './comment-default.component.html',
  styleUrls: ['./comment-default.component.css']
})
export class CommentDefaultComponent implements OnInit {


  @Input() products_id:any;
  @Input() header_text:boolean = false;
  @Input() header_content_text:boolean = true;
  @Input() btn_comment_class:string = 'btn-sm';
  @Input() btn_message_p:boolean = false;
  @Input() btn_message_small:boolean = true;
  @Input() stores_uri:any;



  @Input() textArea_style:any = {
    'height':'40px',
    'borderRadius': '15px'
  };

  public commentArray:{
    product_id:string,
    user_id:string,
    name:string,
    //celphone:string,
    email:string,
    comment:string,
    response:string
  }[]=[];

  @Input() messages:{
    username:string,
    message:string
  }[]=[
    {
      username:'@username',
      message:`Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus
      commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.`
    }
  ];
  @ViewChild('nameComment') nameComment:ElementRef;
  @ViewChild('emailComment') emailComment:ElementRef;
  @ViewChild('celphoneComment') celphoneComment:ElementRef;
  @ViewChild('textComment') textComment:ElementRef;

  constructor(private authorizationHttp:AuthorizationHttp) { }

  ngOnInit(): void {
    this.showComments();
  }

  showComments(){
    this.commentArray=[];
    this.authorizationHttp.storeProductComments(this.products_id)
    .subscribe(
    ( response:HttpResponse<any> ) => {

      if(response.status == 200){
        //console.log(response);
        var data = response.body;
        var body = data.content;//Body del Producto
        this.commentArray=body;

      }
    },
    ( response:HttpErrorResponse ) => {
      //console.log(response);
      //var message = (typeof response.error.message=='undefined')?'¡Sucedio un error inesperado!':response.error.message;


    },
    () =>{
    });
  }
  addComment(){
   let name =this.nameComment.nativeElement.value;
   let email =this.emailComment.nativeElement.value;
   let text =this.textComment.nativeElement.value;
   let celphone =this.celphoneComment.nativeElement.value;

    if(name=='') return null;
    if(email=='') return null;
    if(text=='') return null;
    console.log(name)
    this.authorizationHttp.storeProductAddComments(this.products_id,name,email,celphone,text,this.stores_uri)
    .subscribe(
    ( response:HttpResponse<any> ) => {

      if(response.status == 200){
        name='';
        email='';
        celphone='';
        text='';
        //console.log(response);
        var data = response.body;
        var body = data.content;//Body del Producto
        this.commentArray=body;

      }
    },
    ( response:HttpErrorResponse ) => {
      //console.log(response);
      //var message = (typeof response.error.message=='undefined')?'¡Sucedio un error inesperado!':response.error.message;


    },
    () =>{
      Swal.fire(
        '¡Agregado!',
        'Su comentario ha sido agregado satisfactoriamente.',
        'success'
      )

    });
  }
}
