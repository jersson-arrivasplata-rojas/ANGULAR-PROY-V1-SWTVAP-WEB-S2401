import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Router } from '@angular/router';
import {
  OwlOptions,
  SlidesOutputData
} from 'ngx-owl-carousel-o';
import { CommentInterface as Comment } from 'src/app/shared/interfaces/comment.interface';
import { ImageInterface as Image } from 'src/app/shared/interfaces/image.interface';
import { ProductTagInterface as ProductTag } from 'src/app/shared/interfaces/product-tag.interface';
import { UserInterface as User } from 'src/app/shared/interfaces/user.interface';


import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'card-product-comment',
  templateUrl: './card-product-comment.html',
  styleUrls: ['./card-product-comment.css'],
})
export class CardProductComment implements OnInit {
  @Input() public $comments: Comment[] = [];
  ngOnInit(): void {
    //console.log(this.$comments);
    //throw new Error('Method not implemented.');
  }
  get size(): number {
    return this.$comments.length;
  }

  get sizeArray(): string[] {
    return new Array(this.size);
  }

  getComment(pos: number): Comment {
    return this.$comments[pos];
  }
}

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './template-modal-content.html',
})
export class NgbdModalContent {
  @Input() comments: Comment[] = [];
  @Input() uri;
  @Input() id;
  @Input() user: User = null;

  @ViewChild('nameComment') nameComment: ElementRef;
  @ViewChild('emailComment') emailComment: ElementRef;
  @ViewChild('celphoneComment') celphoneComment: ElementRef;
  @ViewChild('textComment') textComment: ElementRef;

  constructor(
    public activeModal: NgbActiveModal
  ) {}

  addComment() {
    let name = this.nameComment.nativeElement.value;
    let email = this.emailComment.nativeElement.value;
    let text = this.textComment.nativeElement.value;
    let celphone = this.celphoneComment.nativeElement.value;

    if (name == '') return null;
    if (email == '') return null;
    if (text == '') return null;
    // console.log(name)
  }
}

@Component({
  selector: 'app-card-ecommerce-image',
  templateUrl: './card-ecommerce-image.component.html',
  styleUrls: ['./card-ecommerce-image.component.scss'],
})
export class CardEcommerceImageComponent implements OnInit {
  public APP_URL = environment.apiUrl;
  public APP_STORAGE=environment.apiStorage;

  //@ViewChild('productComments') productComments:ElementRef;
  @ViewChild('productComments', { read: ViewContainerRef }) productComments;
  //@ViewChild('owl') owl:any;

  @Input() heart: number;

  @Input() imageArray: Image[] = [];
  @Input() image: any;
  @Input() image_url: any;
  @Input() position: any;
  @Input() facebook: any;
  @Input() id: any;
  @Input() direction: any;
  @Input() uri: any;
  @Input() subcategories_description: any;
  @Input() product_type_sale_discount: any;
  @Input() product_type_sale_price: any;
  @Input() product_type_sale_type: any;
  @Input() product_type_sale_stock: any;
  @Input() product_name: any;
  @Input() products_url: any;
  @Input() products_unavailable: number;
  @Input() user: User = null;
  @Input() products_comments: Comment[] = [];
  @Input() tags: any;
  @Input() tag_name: any;
  @Input() product_tags: ProductTag[] = [];

  @Input() products_images_tag_visible: any;
  @Input() whatsapp: any;
  //https://www.npmjs.com/package/ngx-owl-carousel
  claseBtn: string = CommonUtils.claseAletaria;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: false,
    pullDrag: false,
    dots: true,
    items: 1,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
      1200: {
        items: 1,
      },
      1450: {
        items: 1,
      },
    },
    //navText: ["<i class='fas fa-angle-left' style='font-size: 30px;'></i>","<i style='font-size: 30px;' class='fas fa-angle-right'></i>"],
    nav: false,
  };
  activeSlides: SlidesOutputData;
  //  @ViewChild('owl', { static: false }) owl: ElementRef;
  owl: any; //CarouselComponent

  @Output() emitEvent = new EventEmitter();

  public tabs = [
    {
      title: 'card-product-comment',
      component: CardProductComment,
    },
  ];
  ref: ComponentRef<any>;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private domSanitizer: DomSanitizer,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    //console.log(this.owl);
    /*if(this.products_images_tag_visible==1&&this.imageArray.length >= 2){
      for (let index = 0; index < this.imageArray.length; index++) {
        const im = this.imageArray[index];
        if(im.type==1){
          let claseBtn: string = CommonUtils.claseAletaria;
          let cssStyle: string = `
          .${claseBtn} {
              background: ${im.description};
          }
          `;
          // this.hexToRGB(this.background, 0.5) ${this.hexToRgbT(this.background).string}
          CommonUtils.addStyleBody(cssStyle);
        }

      }
    }*/
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //event.target.innerWidth;
    //console.log(event.target.innerWidth)
    //store/product/comment/select
  }
  goProducto(self, $event, urlProducto) {
    this.router.navigateByUrl(`${this.uri}/${urlProducto}`);
  }

  getPassedData(data: SlidesOutputData, owl: any) {
    this.activeSlides = data;
    this.owl = owl;

    // console.log(this.activeSlides);
    // console.log(owl);
  }

  getData(data: SlidesOutputData) {
    this.activeSlides = data;
    let position = data.startPosition;
    let element: any = document.getElementById(
      'tag' + this.id + position + 't'
    );
    if (element != null) {
      element.checked = true;
      // console.log(this.activeSlides);
    }
  }

  goSlide(k, event) {
    //console.log(this.owl)
    // console.log(k)
    event.stopPropagation();
    this.owl.to('owl-slide-' + this.id + '-' + k);
    //this.owl.to('slide-'+k)
  }
  openComments() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.comments = this.products_comments;
    modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.uri = this.uri;
  }
  get claseAleatoria() {
    return CommonUtils.claseAletaria;
  }
  get splitTags() {
    if (this.tags == null || this.tags == '') {
      return [];
    }
    return this.tags.split(',');
  }
  showComments() {
    this.products_comments = [];
  }

  eventEmitCart($event) {
    this.emitEvent.emit($event);
  }

  public getImageProduct(stores_image_url) {
    return this.APP_STORAGE + stores_image_url;
  }
}

/* public commentArray:{
    product_id:string,
    user_id:string,
    name:string,
    //celphone:string,
    email:string,
    comment:string,
    response:string
  }[]=[];*/
/*for(var i=0;i<this.products_comments.length;i++){
        if(i==this.products_comments.length) break;
        //let item = this.products_comments[i];
      }*/

/*   modalRef.result.then((data) => {
      // on close
      console.log("cerrar");
    }, (reason) => {
      // on dismiss
    });
*/

/*this.productComments.clear();
    if(this.products_comments.length>0){


      const factory: ComponentFactory<CardProductComment> =
      this.componentFactoryResolver.resolveComponentFactory(this.tabs[0].component);
      this.ref = this.productComments.createComponent(factory);
      let array = [...this.products_comments];

      this.ref.instance.$comments = array;

     // ref.instance.eventHour.subscribe(response => this.eventHour(response));
    }*/

//<!--<img data-src="holder.js/32x32?theme=thumb&amp;bg=007bff&amp;fg=007bff&amp;size=1" alt="32x32" class="mr-2 rounded" style="width: 32px; height: 32px;" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1774ad0e5d6%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1774ad0e5d6%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2211.5390625%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true">
/*public divElement: HTMLElement = this.renderer.createElement('div');
  public htmlElement: any = '';
  public trusted: any;

  openComments(){
    //this.productComments.nativeElement.remove();
    //let divElement: HTMLElement = this.renderer.createElement('div');
    this.htmlElement='';
    this.divElement.innerHTML='';
    for(var i=0;i<this.products_comments.length;i++){
      if(i==this.products_comments.length) break;
      let item = this.products_comments[i];
      let div: HTMLElement = this.renderer.createElement('div');
      div.setAttribute('class',`media text-muted   d-flex flex-column ${((i===0)?`pt-3`:``)}`);

      let p: HTMLParagraphElement = this.renderer.createElement('p');
      p.setAttribute('class','media-body pb-3 w-100 mb-0 small lh-125 border-bottom border-gray');

      let strong: HTMLElement = this.renderer.createElement('strong');
      strong.setAttribute('class','d-block text-gray-dark');
      strong.innerHTML=`${item.name} - ${item.email}`;

      p.appendChild(strong);

      let pr: HTMLParagraphElement = this.renderer.createElement('p');
      pr.setAttribute('class','media-body pb-3 w-100 mb-0 small lh-125 border-bottom border-gray');

      let strongr: HTMLElement = this.renderer.createElement('strong');
      strongr.setAttribute('class','d-block text-gray-dark');
      strongr.innerHTML=`Respuesta:`;

      pr.appendChild(strongr);

      div.appendChild(p);
      div.appendChild(pr);
     this.htmlElement+=`
      <div class="media text-muted   d-flex flex-column ${((i===0)?`pt-3`:``)}"  >
        <p class="media-body pb-3 w-100 mb-0 small lh-125 border-bottom border-gray">
          <strong class="d-block text-gray-dark">${item.name} - ${item.email}</strong>
          ${item.comment}
        </p>
        ${((item.response!=null&&item.response!='')?`<p class="media-body pb-3 w-100 mb-0 small lh-125 border-bottom border-gray">
          <strong class="d-block text-gray-dark">Respuesta:</strong>
          ${item.response}
        </p>`:``)}
        <hr class="mb-0"/>
      </div>
      `;
      this.divElement.appendChild(div);
    }
    //this.productComments.nativeElement.insertAdjacentElement("beforeend", divElement);

    console.log(this.products_comments);

    this.trusted = this.domSanitizer.bypassSecurityTrustUrl(this.htmlElement);
  } */
