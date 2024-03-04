import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'swtvap-input-default',
  templateUrl: './input-default.component.html',
  styleUrls: ['./input-default.component.scss']
})
export class InputDefaultComponent implements OnInit {
  @Input() placeholder: string ='';
  @Input() type: string = 'text';
  @Input() inputClass: string = 'form-control';
  @Input() color: string = 'primary';

  constructor() { }

  ngOnInit(): void {
  }

  getClasses(){
    if(this.color == 'primary'){
      return 'border-line-primary shadow-primary';
    }else if(this.color == 'secondary'){
      return 'border-line-secondary shadow-secondary';
    }else if(this.color == 'success'){
      return 'border-line-success shadow-success';
    }else if(this.color == 'info'){
      return 'border-line-info shadow-info';
    }else if(this.color == 'warning'){
      return 'border-line-warning shadow-warning';
    }else if(this.color == 'danger'){
      return 'border-line-danger shadow-danger';
    }else if(this.color == 'light'){
      return 'border-line-light shadow-light';
    }else if(this.color == 'dark'){
      return 'border-line-dark shadow-dark';
    }
    return '';
  }
}
