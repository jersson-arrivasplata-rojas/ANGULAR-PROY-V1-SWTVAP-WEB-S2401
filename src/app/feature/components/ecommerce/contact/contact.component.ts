import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, of, switchMap, tap } from 'rxjs';
import { WContactsHttp } from 'src/app/shared/http/w-contacts.http';
import { emailDomainValidator } from 'src/app/shared/validators/email-domain.validators';

@Component({
  selector: 'swtvap-ecommerce-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  profile: any;
  carrousel: any;
  itemForm: FormGroup;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder, private wContactsHttp:WContactsHttp) {
    this.itemForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      contact: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.maxLength(50), emailDomainValidator()]],
      details: [''],
      status: [0, Validators.required]
    });
  }

  ngOnInit() {
    const { wParameters: { profile, carrousel } } = this.activatedRoute.parent.snapshot.data.process;
    this.profile = profile?.[0] ?? {};
    this.carrousel = carrousel?.[0] ?? {};
  }

  add() {
    if (this.itemForm.valid) {
      const item = { ...this.init(), ...this.itemForm.value };
      this.wContactsHttp.addWContacts(item).pipe(
        tap((data) => (window as any).success("¡Su mensaje se envio con \u00E9xito!")),
        switchMap(() => of(null).pipe(
          delay(2000),
          tap(() => this.router.navigate(['/']))
        ))
      ).subscribe();
    }
  }

  init() {
    return {
      name: '',
      contact: '',
      email: '',
      whatsapp: '',
      details: '',
      status: 0
    };
  }
}
