import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-default',
  templateUrl: './select-default.component.html',
  styleUrls: ['./select-default.component.scss']
})
export class SelectDefaultComponent implements OnInit {
  @Input() selectClass: string = 'form-control';
  @Input() color: string = 'warning';
  @Input() options: {
      value: string;
      selected: string;
      text: string;
  }[]
  /* = [
    {
      value: '1',
      selected: '',
      text:'Option 1'
    },
    {
      value: '2',
      selected: 'selected',
      text:'Option 2'
    },
    {
      value: '3',
      selected: '',
      text:'Option 3'
    }
  ];*/
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
