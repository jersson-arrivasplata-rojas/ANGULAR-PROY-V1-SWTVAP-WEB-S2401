import { Component, OnInit } from '@angular/core';

//declare var require: any;
//const fs = require('fs');

@Component({
  selector: 'app-icon-iconsmind-default',
  templateUrl: './icon-iconsmind-default.component.html',
  styleUrls: ['./icon-iconsmind-default.component.scss']
})
export class IconIconsmindDefaultComponent implements OnInit {

  icons: HTMLElement[]=[]
  iconClasses: string[]=[]
 // toastActivate: boolean = false;
 copyIconClasses: any

  iconClassDiv={
    display:'flex',
    flexWrap: 'wrap'
  }

  iconClassDivContent={
    width: '165px',
    height: '150px',
    textAlign: 'center'
  }

  constructor() { }

  ngOnInit(): void {

    this.getFileIcons()

  }

  getFileIcons() {
    // https://dev.to/idrisrampurawala/creating-a-search-filter-in-angular-562d
    //https://developers.google.com/web/updates/2019/02/constructable-stylesheets
    const myHeaders = new Headers();

    const myRequest = new Request('../../../../assets/Icons/iconsmind/iconsmind.css', {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
    });

    fetch(myRequest)
      .then(response => response.text())
      .then(response => {

        //let stylesheet = this.stylesheet(response);
        //console.log(stylesheet)
        var icons=this.stylesheet(response).cssRules;
        var iconLength=icons.length;
        //var i=0;
        //var cantidad=15
        for (var x = 2; x < iconLength; x++) {
          var t = icons[x];
          //console.log(t);
          var d = (t['selectorText'])

          //console.log(d);
          var e = d.split('::')[0];
          //console.log(e);
          var f = e.split('.')[1];
          //console.log(f);

          this.iconClasses.push(f)
          //console.log(f);

          var ICreate = document.createElement("i");
          ICreate.className = f;
          ICreate.style.fontSize = '50px';
          ICreate.style.display = 'inline-block';
          ICreate.style.margin = '0.4em';

          this.icons.push(ICreate)

        }

        this.clone()

      });

  }

  stylesheet(string = '') {
    const iframe = document.createElement('iframe')
    document.head.appendChild(iframe)
    const style = iframe.contentDocument.createElement('style')
    style.textContent = string
    iframe.contentDocument.head.appendChild(style)
    const stylesheet = iframe.contentDocument.styleSheets[0]
    iframe.remove()


    return stylesheet
  }


  copyTo(event,clase){
    var txt =`.${clase}`;
    const cleanText = txt.replace(/<\/?[^>]+(>|$)/g, '');
    const x = document.createElement('TEXTAREA') as HTMLTextAreaElement;
    x.value = cleanText;
    document.body.appendChild(x);
    x.select();
    document.execCommand('copy');
    document.body.removeChild(x);

    this.activateToast()
  }


  activateToast(){
    //this.toastActivate = true;
    document.querySelector('.toast-container').classList.remove('d-none');
    setTimeout(() => {
      document.querySelector('.toast-container').classList.add('d-none');
    }, 1500);
  }



  FilterPipe(searchText: string): void {

    if (!this.copyIconClasses) {
      return this.clone();
    }
    if (!searchText) {
      return  this.clone();
    }
    searchText = searchText.toLocaleLowerCase();
    this.copyIconClasses = this.iconClasses.filter(it => {
      return it.toLocaleLowerCase().includes(searchText);
    });
  }

  clone(){
    this.copyIconClasses = [...this.iconClasses];
  }
}
//yarn add @types/node --dev

//https://stackoverflow.com/questions/49102724/angular-5-copy-to-clipboard
//.i-Navigation-Right-Window
//http://gull.ui-lib.com/purple/#/applayout-sidebar-large/uikits/alerts
/*
  .toast-top-right {
      right: 30px;
  }
  .toast-container {
      pointer-events: none;
      position: fixed;
      z-index: 999999;
  }
  .toast-top-right {
      top: 12px;
  }
*/
