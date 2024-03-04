import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { environment } from 'src/environments/environment';

declare var dynamics: any;

@Component({
  selector: 'swtvap-bottom-navbar-default',
  templateUrl: './bottom-navbar-default.component.html',
  styleUrls: ['./bottom-navbar-default.component.css']
})
export class BottomNavbarDefaultComponent implements OnInit {
  @ViewChild('infoModal') infoModal:ElementRef;


  public APP_URL = environment.apiUrl;

  @Input() theme_color_info;
  @Input() stores_collect;
  @Input() stores_delivery;
  @Input() stores_coverage;
  @Input() payments;

  public pagoEfectivo;
  public pagoTransferencia;
  public pagoAppBanco;
  public pagoOtroMetodoPago;
  @Input() payment_card;

  constructor() { }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scrollEvent, true);
    for (let index = 0; index < this.payment_card.length; index++) {//

      if(index==this.payment_card.length) break;
      let e =  this.payment_card[index];

      console.log(e);
      if(e['type'] == 0){
        this.pagoEfectivo=1;
      }else if(e['type'] == 1){
        this.pagoTransferencia=1;
      }else if(e['type'] == 2){
        this.pagoAppBanco=1;
      }else if(e['type'] == 3){
        this.pagoOtroMetodoPago=1;
      }
    }
  }

  close(){
    //BOTTOM-NAVBAR-STORE-CONTAINER
    document.getElementById('BOTTOM-NAVBAR-DEFAULT-CONTAINER').classList.add('d-none');
    document.getElementById('BOTTOM-NAVBAR-DEFAULT-INFO').classList.remove('d-none');
  }

  info(){
    document.getElementById('BOTTOM-NAVBAR-DEFAULT-CONTAINER').classList.remove('d-none');
    document.getElementById('BOTTOM-NAVBAR-DEFAULT-INFO').classList.add('d-none');

  }


  scrollEvent = (event: any): void => {
    //console.log(event);
    let n = (event.target.scrollHeight - event.target.scrollTop)-800;
    if(n<=200){
     // document.getElementById('BOTTOM-NAVBAR-STORE').style.visibility="hidden"
    }else{
      //document.getElementById('BOTTOM-NAVBAR-STORE').style.visibility="visible";
    }
  }
  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollEvent, true);
  }
  public onWindowScroll(event: Event): void {
    //console.log('scrolled');
  }




  alertShowModal(element){
    CommonUtils.alertModalShow(element,this.infoModal.nativeElement,dynamics);
  }


  alertCloseModal(element){
    CommonUtils.alertModalClose(element,this.infoModal.nativeElement,dynamics);
  }

}
