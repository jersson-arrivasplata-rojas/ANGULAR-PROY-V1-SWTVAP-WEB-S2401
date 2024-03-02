import { Pipe, PipeTransform } from '@angular/core';
import { StatusContactEnum } from '../config/status-contact.enum';

@Pipe({
  name: 'statusContact'
})
export class StatusContactPipe implements PipeTransform {

  transform(value: string | number): string {
    return StatusContactEnum[value];
  }

}
