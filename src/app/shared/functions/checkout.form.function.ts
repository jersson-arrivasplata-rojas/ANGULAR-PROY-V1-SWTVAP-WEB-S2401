import { Validators } from "@angular/forms";
import { emailValidation, len, numeric } from "../validators/custom.validator";

export function checkoutFormFN() {
  return [
    {
      label: 'Nombre',
      placeholder: 'Nombre',
      uid: 'firstName',
      type: 'text',
      value: '',
      validation: [Validators.required],
      errorMsg: 'El campo es requerido'
    },
    {
      label: 'Apellido',
      placeholder: 'Apellido',
      uid: 'lastName',
      type: 'text',
      value: '',
      validation: [Validators.required],
      errorMsg: 'El campo es requerido'
    },
    {
      label: 'Correo Electronico',
      placeholder: 'Email',
      uid: 'email',
      type: 'text',
      value: '',
      validation: [Validators.required, emailValidation()],
      errorMsg: 'El campo es requerido'
    },
    {
      label: 'Numero Telefonico',
      placeholder: 'Numero Telefonico',
      uid: 'mobile',
      type: 'text',
      value: '',
      validation: [Validators.required, len(10), numeric()],
      errorMsg: 'El campo es requerido'
    },
    {
      label: 'Direccion 1',
      placeholder: 'Direccion 1',
      uid: 'addressOne',
      type: 'text',
      value: '',
      validation: [Validators.required],
      errorMsg: 'El campo es requerido'
    },
    {
      label: 'Direccion 2',
      placeholder: 'Direccion 2',
      uid: 'addressTwo',
      type: 'text',
      value: '',
      validation: [Validators.required],
      errorMsg: 'El campo es requerido'
    },
    {
      label: 'Departamento',
      placeholder: 'Departamento',
      uid: 'state',
      type: 'select',
      value: '',
      validation: [Validators.required],
      options: [
        'La Paz',
        'Santa Cruz',
        'Cochabamba',
        'Chuquisaca',
        'Oruro',
        'Potosi',
        'Tarija',
        'Beni',
        'Pando'
      ],
      errorMsg: 'El campo es requerido'
    },
    {
      label: 'Codigo ZIP',
      placeholder: 'ZIP',
      uid: 'zip',
      type: 'text',
      value: '',
      validation: [Validators.required],
      errorMsg: 'El campo es requerido'
    },
    {
      label: 'Modo de Pago',
      placeholder: 'Payment Mode',
      uid: 'paymentmode',
      type: 'select',
      value: '',
      validation: [Validators.required],
      options: ['Tarjeta de Credito', 'PAYPAL', 'Efectivo', 'Transferencia'],
      errorMsg: 'El campo es requerido'
    }
  ];
}
