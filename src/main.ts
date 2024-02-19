import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// Importa Swal si no lo has hecho
import Swal from 'sweetalert2';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

(window as any).info = function (message: string) {
  Swal.fire("", message, "info");
};

(window as any).success = function (message: string) {
  Swal.fire("", message, "success");
};

// Asigna Swal.fire a window.confirm
(window as any).confirm = async function (message: string): Promise<boolean> {
  const confirmButtonText = message.includes("eliminar") ? "Eliminar" : "Aceptar";
  const denyButtonText = message.includes("eliminar") ? "Cancelar" : "Cancelar";
  const result = await Swal.fire({
    title: message,
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: confirmButtonText,
    denyButtonText: denyButtonText
  });

  if (result.isConfirmed) {
    //Swal.fire("¡Guardado!", "", "success");
    return true;
  } else if (result.isDenied) {
    ////Swal.fire("Los cambios no se guardar\u00F3n", "", "info");
    return false;
  }
  return false; // Añade un valor de retorno por defecto en caso de que el resultado no sea confirmado ni denegado
};
