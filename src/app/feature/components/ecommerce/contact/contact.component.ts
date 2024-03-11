import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'swtvap-ecommerce-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactDetails = {
    name: '',
    email: '',
    details: ''
  };

  profile: any;
  carrousel: any;


  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const { profile, carrousel } = this.activatedRoute.parent.snapshot.data.process;
    this.profile = profile?.[0] ?? {};
    this.carrousel = carrousel?.[0] ?? {};
  }

  submitContactForm() {
    // Aquí iría la lógica para enviar la información de contacto, por ejemplo:
    console.log(this.contactDetails);
    // Podrías añadir aquí la lógica para enviar estos datos a un servidor o API
  }
}
