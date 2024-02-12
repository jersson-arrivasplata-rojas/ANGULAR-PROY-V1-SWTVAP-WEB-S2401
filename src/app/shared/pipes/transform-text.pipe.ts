import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformText'
})
export class TransformTextPipe implements PipeTransform {

  transform(value: string | boolean): string {
    value = String(value ? value : '');
    return value.trim() === '' ? '-' : `${value}%`;
  }

}
