import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformText'
})
export class TransformTextPipe implements PipeTransform {

  transform(value: string | boolean, type: string = ''): string {
    if(type === 'percentage'){
      return this.transformPercentaje(value);
    }
    return this.transformText(value);
  }

  transformPercentaje(value: string | boolean): string {
    return `${value}%`;
  }

  transformText(value: string | boolean): string {
    value = String(value ? value : '');
    return value.toString().trim() === '' ? '-' : `${value}`;
  }
}
