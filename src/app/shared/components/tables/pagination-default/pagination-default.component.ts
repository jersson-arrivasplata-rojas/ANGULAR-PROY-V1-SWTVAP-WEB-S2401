import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
//import * as _ from 'underscore';

@Component({
  selector: 'app-pagination-default',
  templateUrl: './pagination-default.component.html',
  styleUrls: ['./pagination-default.component.scss']
})
export class PaginationDefaultComponent implements OnInit, AfterViewInit {
  // https://codepen.io/karpovsystems/pen/fFHxK

  @Input() total: string; // = ''
  @Input() page: string; // = ''
  @Input() pagination: string; // = ''
  @Input() align: string = 'center'; // = ''
  @Input() color: string = 'primary'; // = ''


  public step: number = 5;

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void{

  }

  setPage(event: MouseEvent, page: number) {
    if (page < 0 || page > (this.totalPages()-1)) {
      return;
    }

    const button: HTMLButtonElement = event.target as HTMLButtonElement;
    const ls: NodeListOf<HTMLLIElement> = button.parentElement.parentElement.querySelectorAll('li');

    let resta: number = 0;
    if(page > (this.totalStep())){//-1
      resta = Math.abs(this.totalStep() - page);
      this.addDNone(ls);
      this.removeDNone(ls,(2 + resta),(2+(1+page)));
      setTimeout(()=>{
        if(!ls[2].classList.contains('d-none')){
          ls[2].classList.add('d-none');
        }
      },300);
      //6
    }else if(page == 0){
      this.addDNone(ls);
      this.removeDNone(ls,2,(2+(1+this.totalStep())));
    }

    this.page = (page).toString();
    //ls[page].classList.add('active')
  }

  addDNone(ls: NodeListOf<HTMLLIElement>){
    for( let index: number = 2; index < ls.length-2; index++ ) {
      const element: HTMLLIElement = ls[index];
      element.classList.add('d-none');
    }
  }

  removeDNone(ls: NodeListOf<HTMLLIElement>,start: number, end:number){
    for (let index: number = start; index < end; index++) {
      const element: HTMLLIElement = ls[(index)];
      //if(element.classList.contains('d-none')){}
      element.classList.remove('d-none');
    }
  }

  totalInt(): number {
    let total = parseInt(this.total);
    return total;
  }

  pageInt(): number{
    let page = parseInt(this.page);
    return page;
  }

  pager(): string[]{
    let step = this.step;
    return new Array(step);
  }

  totalStep(){
    return (this.step);//
  }

  counter(): string[]{
    let i = this.totalPages();
    return new Array(i);
  }

  totalPages(): number {
    let total = this.totalInt();
    let pagination = parseInt(this.pagination);

    return Math.ceil(total / pagination);
  }

}
// https://embed.plnkr.co/plunk/oyFWJe
// https://stackoverflow.com/questions/45028233/property-value-does-not-exist-on-type-htmlelement-for-textarea-angular/45029752
// https://stackoverflow.com/questions/58641615/click-event-is-not-working-in-innerhtml-string-angular-6
// https://stackoverflow.com/questions/48817261/click-event-not-work-in-innerhtml-string-angular-4/48817568
    //2
    /* for (let index = 2; index < (2+resta); index++) {
        const element = ls[(index)];
        if(!element.classList.contains('d-none')){
          element.classList.add('d-none');
        }
      }*/
