import { Component, OnInit } from '@angular/core';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-generator-css',
  templateUrl: './generator-css.component.html',
  styleUrls: ['./generator-css.component.scss']
})
export class GeneratorCssComponent implements OnInit {

  constructor() { }

  colors=[]
  primaryColor = '#194D33';
  state = {
    h: 150,
    s: 0.50,
    l: 0.20,
    a: 1,
  };

  changeComplete($event: ColorEvent): void {
    this.state = $event.color.hsl;
    this.primaryColor = $event.color.hex;
  }
  ngOnInit(): void {
    this.generatecolors()
  }
  
  generatecolors(){
    this.colors.push(
      {
        'hexadecimal': '#003473',
        'color':'blue'
      },
      {
        'hexadecimal': '#3F51B5',
        'color':'indigo'
      },
      {
        'hexadecimal': '#663399',
        'color':'purple'
      },
      {
        'hexadecimal': '#f44336',
        'color':'red'
      },
      {
        'hexadecimal': '#CB3066',
        'color':'pink'
      },
      {
        'hexadecimal': '#e97d23',
        'color':'orange'
      },
      {
        'hexadecimal': '#ffc107',
        'color':'yellow'
      },
      {
        'hexadecimal': '#4caf50',
        'color':'green'
      },
      {
        'hexadecimal': '#20c997',
        'color':'teal'
      },
      {
        'hexadecimal': '#9c27b0',
        'color':'cyan'
      },
      {
        'hexadecimal': '#fff',
        'color':'white'
      },
      {
        'hexadecimal': '#70657b',
        'color':'gray'
      },
      {
        'hexadecimal': '#663399',
        'color':'primary'
      },
      {
        'hexadecimal': '#52495a',
        'color':'secondary'
      },
      {
        'hexadecimal': '#4caf50',
        'color':'success'
      },
      {
        'hexadecimal': '#003473',
        'color':'info'
      },
      {
        'hexadecimal': '#ffc107',
        'color':'warning'
      },
      {
        'hexadecimal': '#f44336',
        'color':'danger'
      },
      {
        'hexadecimal': '#bbb',
        'color':'light'
      },
      {
        'hexadecimal': '#47404f',
        'color':'dark'
      },
      {
        'hexadecimal': '#52495a',
        'color':'gray-dark'
      },
      {
        'hexadecimal': '#f8f9fa',
        'color':'gray-100'
      },
      {
        'hexadecimal': '#eee',
        'color':'gray-200'
      },
      {
        'hexadecimal': '#dee2e6',
        'color':'gray-300'
      },
      {
        'hexadecimal': '#ced4da',
        'color':'gray-400'
      },
      {
        'hexadecimal': '#bbb',
        'color':'gray-500'
      },
      {
        'hexadecimal': '#70657b',
        'color':'gray-600'
      },
      {
        'hexadecimal': '#5e5c70',
        'color':'gray-700'
      },
      {
        'hexadecimal': '#52495a',
        'color':'gray-800'
      },
      {
        'hexadecimal': '#47404f',
        'color':'gray-900'
      }

    );
  }


}
