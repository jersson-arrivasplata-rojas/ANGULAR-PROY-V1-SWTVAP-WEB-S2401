import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { translateFN } from 'src/app/shared/functions/translate.function';
import { WNewsletterSubscriptionsHttp } from 'src/app/shared/http/w-newsletter-subscriptions.http';
import { LocalService } from 'src/app/shared/services/local.service';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { emailDomainValidator } from 'src/app/shared/validators/email-domain.validators';

@Component({
  selector: 'swtvap-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent implements AfterViewInit {
  @ViewChild('newsletterBtnModal') newsletterBtnModal: ElementRef;
  @ViewChild('newsletterBtnCloseModal') newsletterBtnCloseModal: ElementRef;
  itemForm: FormGroup;

  constructor(private localService: LocalService, private formBuilder: FormBuilder,
    private translateService:TranslateService, private wNewsletterSubscriptionsHttp:WNewsletterSubscriptionsHttp) {
    this.itemForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(50), emailDomainValidator()]],
      status: [1, Validators.required],
      subscribedAt: [CommonUtils.getDayNow(), [Validators.required, Validators.pattern(PatternEnum.DATE)]],
    });
  }

  ngAfterViewInit() {
    // Usamos jQuery para mostrar el modal
    this.checkNewsletterAndOpenModal(); // Ejecutar una vez al inicio

    setInterval(() => {
      this.checkNewsletterAndOpenModal(); // Ejecutar cada 5 segundos
    }, (3 * 60 * 60 * 1000));//Cada 3 horas
  }
  checkNewsletterAndOpenModal() {
    const data = this.localService.getData('newsletter');
    if (!data) {
      this.newsletterBtnModal.nativeElement.click();
    }
  }
  add() {
    if (this.itemForm.valid) {
      const success = translateFN()[this.translateService.getCurrentLang()].alert.successSubscribed;
      const item = { ...this.init(), ...this.itemForm.value };
      this.wNewsletterSubscriptionsHttp.addWNewsletterSubscriptions(item).pipe(
        tap((data) => (window as any).success(success)))
        .subscribe(response => {
          this.itemForm.reset();
          this.localService.saveData('newsletter', 'true');
          this.newsletterBtnCloseModal.nativeElement.click();
        });
    }
  }

  init() {
    return {
      email: '',
      status: 1,
      subscribedAt: CommonUtils.getDayNow()
    };
  }
}
