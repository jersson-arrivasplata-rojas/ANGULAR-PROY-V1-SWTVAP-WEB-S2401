import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusLang'
})
export class StatusLangPipe implements PipeTransform {

  transform(value: string | number): string {
    let status = "";
    switch (value) {
      case 0:
        status = "Espa\u00F1ol"
        break;
      case 1:
        status = "Ingles"
        break;
    }
    return status;
  }

}
