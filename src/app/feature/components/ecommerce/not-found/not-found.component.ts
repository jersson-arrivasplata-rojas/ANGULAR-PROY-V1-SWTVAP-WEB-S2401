import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { HomeEnum } from 'src/app/shared/config/home.enum';
import { TranslateService } from 'src/app/shared/services/translate.service';

@Component({
  selector: 'swtvap-ecommerce-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit, OnDestroy {

  status: string = '404';
  title: string = 'Error!';
  message: string = '¡Lo siento! La p\u00E1gina que buscaba no existe.';

  profile: any;
  carrousel: any;
  homeEnum = HomeEnum;

  private translationsSubscription: Subscription;
  private languageSubscription: Subscription;


  constructor(private activatedRoute: ActivatedRoute, private translateService: TranslateService) { }

  ngOnInit() {
    const { profile, carrousel } = this.activatedRoute.parent.snapshot.data.process;
    this.profile = profile?.[0] ?? {};
    this.carrousel = carrousel?.[0] ?? {};
    this.subscribeToLanguageChange();
    this.fetchTranslations();
  }

  ngOnDestroy(): void {
    // Asegúrate de desuscribirte de todas las suscripciones
    this.translationsSubscription?.unsubscribe();
    this.languageSubscription?.unsubscribe();
  }

  subscribeToLanguageChange(): void {


    this.languageSubscription = this.translateService.getOnLangChange()
    .pipe(tap(() => this.fetchTranslations()))
    .subscribe();
  }

  fetchTranslations(): void {
    // Cancela la suscripción anterior para evitar fugas de memoria
    this.translationsSubscription?.unsubscribe();

    this.translationsSubscription = this.translateService.getTranslate('ecommerce.pages.notFound')
      .subscribe((data: any) => {
        this.status = data.status;
        this.title = data.title;
        this.message = data.description;
      });
  }

}
