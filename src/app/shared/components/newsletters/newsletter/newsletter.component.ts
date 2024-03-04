import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LocalService } from 'src/app/shared/services/local.service';

@Component({
  selector: 'swtvap-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent implements AfterViewInit {
  @ViewChild('newsletterBtnModal') newsletterBtnModal: ElementRef;
  @ViewChild('newsletterBtnCloseModal') newsletterBtnCloseModal: ElementRef;

  constructor(private localService: LocalService) { }

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
    this.localService.saveData('newsletter', 'true');
    this.newsletterBtnCloseModal.nativeElement.click();
  }
}
