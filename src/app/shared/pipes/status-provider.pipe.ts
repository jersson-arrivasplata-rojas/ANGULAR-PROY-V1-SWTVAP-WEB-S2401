import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusProvider'
})
export class StatusProviderPipe implements PipeTransform {

  transform(value: string | number): string {
    let status = "";
    switch (value) {
      case 0:
        status = "En Preparación"
        break;
      case 1:
        status = "Recibido por la Empresa de Envío"
        break;
      case 2:
        status = "En Tránsito"
        break;
      case 3:
        status = "En Almacén Local"
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
