import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector, private ngZone: NgZone) { }  // inyecta NgZone

  handleError(error: any) {
    const router = this.injector.get(Router);
    if (error.message === 'Authentication failed') {
      this.ngZone.run(() => {  // usa ngZone.run() para ejecutar la navegaci\u00F3n
        router.navigate(['/auth/login']);
      });
    }
    // manejar otros errores
    console.error(error); // reemplaza esto con tu c\u00F3digo
  }
}
