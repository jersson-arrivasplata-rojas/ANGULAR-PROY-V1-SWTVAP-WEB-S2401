import { Component } from '@angular/core';

@Component({
  selector: 'swtvap-ecommerce-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactDetails = {
    name: '',
    email: '',
    details: ''
  };

  submitContactForm() {
    // Aquí iría la lógica para enviar la información de contacto, por ejemplo:
    console.log(this.contactDetails);
    // Podrías añadir aquí la lógica para enviar estos datos a un servidor o API
  }
}
