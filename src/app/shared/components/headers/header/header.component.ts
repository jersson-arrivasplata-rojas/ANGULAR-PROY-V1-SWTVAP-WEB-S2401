import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { HomeEnum } from 'src/app/shared/config/home.enum';
import { ParameterInterface } from 'src/app/shared/interfaces/parameter.interface';
import { TranslateService } from 'src/app/shared/services/translate.service';

@Component({
  selector: 'swtvap-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnChanges, OnDestroy {

  @Input() carrousel: ParameterInterface | any = {};
  @Input() hideNotCarrousel: boolean = false;
  @Input() hideNotBenefit: boolean = false;

  proposal = [ 'item1', 'item2', 'item3', 'item4' ];
  homeEnum = HomeEnum;
  carrouselStore: any = [];

  private translationsSubscription: Subscription;
  private languageSubscription: Subscription;
  constructor(private activatedRoute: ActivatedRoute, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.subscribeToLanguageChange();
    this.fetchTranslations();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeCarrousel();
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

    this.translationsSubscription = this.translateService.getTranslate('ecommerce')
      .subscribe((data: any) => {
        this.changeCarrousel();
      });
  }
  changeCarrousel() {
    this.carrouselStore = this.carrousel?.children.filter((item: any) => item.value2 === this.translateService.getCurrentLang());
  }

}
