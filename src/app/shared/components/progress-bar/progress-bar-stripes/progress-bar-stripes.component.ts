import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swtvap-progress-bar-stripes',
  templateUrl: './progress-bar-stripes.component.html',
  styleUrls: ['./progress-bar-stripes.component.scss']
})
export class ProgressBarStripesComponent implements OnInit {

  @Input() claseProgressBar: string ;
  @Input() tipo: string ='progress-bar-striped progress-bar-animated';
  @Input() max: string = "100";
  @Input() now: string = "0";
  @Input() min: string = "0";
  @Input() second: string = "1000";
  @Input() aumentar: string = "1";
  @Input() loop: string = "false";
  @Input() textoActivate: string = "true";
  public completado: string;

  //@ViewChild("progressBarStripe") progressBarStripe: ElementRef;

  constructor() {}

  ngOnInit(): void {
    //console.log(this.progressBarStripe);

    var interVal=setInterval(()=>{

      if(this.valueNow >= this.valueMax && this.loop == "true" ){
        this.now = "0";
      }else if(this.valueNow >= this.valueMax && this.loop == "false" ){
        clearInterval(interVal);
        this.completado = `Completado ${this.valueMax}%`
      }else{
        this.now = (this.valueXsecond).toString();
        this.completado = `${this.valueMax}%`
      }
    }, parseInt(this.second));


  }

  get valueMax(): number{
    return parseInt(this.max);
  }

  get valueMin(): number{
    return parseInt(this.min);
  }
  get valueNow(): number{
    return parseInt(this.now);
  }

  get valueTextNow(): string{
    return ((this.now).toString() + '%');
  }

  get valueXsecond(): number{
    return parseInt(this.now) + parseInt(this.aumentar);
  }
}
/*this.cssStyle= `
width: ${this.valuenow}%;
`;*/
/*var element:HTMLElement =  this.progressBarStripe.nativeElement;
var div = element.querySelector('div');
div.setAttribute('aria-valuenow',(this.valuenow).toString());
div.setAttribute('aria-valuemin',(this.valuemin).toString());
div.setAttribute('aria-valuemax',(this.valuemax).toString());
div.setAttribute('style',`width: ${this.valuenow}%;`);*/

//style="width: 100%;" aria-valuenow="valueMax" aria-valuemin="valuemin" aria-valuemax="valuemax"


///style="width: 100%;" aria-valuenow="valueMax" aria-valuemin="valuemin" aria-valuemax="valuemax"

/*public cssStyle: string = `
width: 0%;
`;*/
