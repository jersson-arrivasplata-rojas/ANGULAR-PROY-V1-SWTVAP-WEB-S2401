import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusProvider'
})
export class StatusProviderPipe implements PipeTransform {

  transform(value: string | number): string {
    let status = "";
    switch (value) {
      case 0:
        status = "En Preparaci\u00F3n"
        break;
      case 1:
        status = "Recibido por la Empresa de Env\u00EDo"
        break;
      case 2:
        status = "En Tr\u00E1nsito"
        break;
      case 3:
        status = "En Almac\u00E9n Local"
        break;
      case 4:
        status = "En Entrega"
        break;
      case 5:
        status = "Entregado"
        break;
      case 6:
        status = "Cancelado"
        break;
    }
    return status;
  }

}
