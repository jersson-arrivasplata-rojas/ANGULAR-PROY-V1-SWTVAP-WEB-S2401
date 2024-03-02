import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusContact'
})
export class StatusContactPipe implements PipeTransform {

  transform(value: string | number): string {
    let status = "";
    switch (value) {
      case 0:
        status = "No Revisado"
        break;
      case 1:
        status = "Revisado"
        break;
    }
    return status;
  }

}
