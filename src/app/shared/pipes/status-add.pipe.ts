import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusAdd'
})
export class StatusAddPipe implements PipeTransform {

  transform(value: string | boolean): string {

    return value ? 'Agregado' : 'No Agregado';
  }

}
