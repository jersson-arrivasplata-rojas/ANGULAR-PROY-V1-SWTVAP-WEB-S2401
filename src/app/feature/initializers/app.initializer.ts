export function appInitializerFactory() {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      const lastCleanup = localStorage.getItem('lastCleanup');
      const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

      if (!lastCleanup) {
        // Si no hay una fecha de última limpieza, limpia el localStorage y establece la fecha de última limpieza a ahora
        //localStorage.clear();
        localStorage.removeItem('cartinfo');

        localStorage.setItem('lastCleanup', Date.now().toString());
      } else if (Date.now() - Number(lastCleanup) > oneWeekInMilliseconds) {
        // Si han pasado más de 7 días desde la última limpieza, limpia el localStorage y actualiza la fecha de última limpieza
        //localStorage.clear();
        localStorage.removeItem('cartinfo');
        localStorage.setItem('lastCleanup', Date.now().toString());
      }

      resolve(void 0);
    });
  };
}
