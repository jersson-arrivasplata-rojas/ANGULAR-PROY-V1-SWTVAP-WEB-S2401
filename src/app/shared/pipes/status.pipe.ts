import { Pipe, PipeTransform } from '@angular/core';
import { StatusEnum } from '../config/status.enum';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string | boolean): string {

    if (typeof value === 'boolean') {
      return value ? 'Activo' : 'Inactivo';
    }

    return value === StatusEnum.ACTIVE ? 'Activo' : 'Inactivo';
  }

}
