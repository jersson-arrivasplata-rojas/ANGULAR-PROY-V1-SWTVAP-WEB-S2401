import { AbstractControl } from '@angular/forms';

export function emailDomainValidator() {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const email = control.value;
    const domainPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const match = domainPattern.test(email);
    return match ? null : {invalidDomain: {value: control.value}};
  };
}
