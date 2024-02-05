import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyText'
})
export class EmptyTextPipe implements PipeTransform {

  transform(value: string | boolean): string {
    value = String(value ? value : '');
    return value.trim() === '' ? '-' : value;
  }

}
