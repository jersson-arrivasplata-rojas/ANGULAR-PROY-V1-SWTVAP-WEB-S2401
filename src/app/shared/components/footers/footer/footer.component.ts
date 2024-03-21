import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { skip, tap } from 'rxjs';
import { StoreProfile } from 'src/app/shared/class/store-profile';
import { HomeEnum } from 'src/app/shared/config/home.enum';
import { PatternEnum } from 'src/app/shared/constants/patterns.const';
import { translateFN } from 'src/app/shared/functions/translate.function';
import { WNewsletterSubscriptionsHttp } from 'src/app/shared/http/w-newsletter-subscriptions.http';
import { ParameterInterface } from 'src/app/shared/interfaces/parameter.interface';
import { ShareDataService } from 'src/app/shared/services/share-data.service';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { CommonUtils } from 'src/app/shared/utils/common.utils';
import { emailDomainValidator } from 'src/app/shared/validators/email-domain.validators';

@Component({
  selector: 'swtvap-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnChanges {
  @Input() profile: ParameterInterface | any = {};
  @Input() lang: string;
  homeEnum = HomeEnum;
  profileStore: StoreProfile;

  common = [
    {
      title: 'findUs',
      class: 'fa-map-marker-alt fas',
      target: '_blank',
      value1: () => this.profileStore?.addressMap,
      value: () => this.profileStore?.address
    },
    {
      title: 'contactUs',
      class: 'fa-phone fas',
      value: () => this.profileStore?.cellphone
    },
    {
      title: 'sendUsAEmail',
      class: 'fa-envelope-open far',
      value: () => this.profileStore?.email
    },
  ];

  menuBottom = [
    {
      title: 'home',
      link: '/'
    },
    {
      title: 'guideAndHelp',
      link: '/politics-and-privacy',
    },
    {
      title: 'contactus',
      link: '/contact-us',
    },
  ];
  itemForm: FormGroup;

  constructor(private router: Router, private shareDataService: ShareDataService, private translateService:TranslateService,
    private formBuilder: FormBuilder, private wNewsletterSubscriptionsHttp:WNewsletterSubscriptionsHttp) {
    this.itemForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(50), emailDomainValidator()]],
      status: [1, Validators.required],
      subscribedAt: [CommonUtils.getDayNow(), [Validators.required, Validators.pattern(PatternEnum.DATE)]],
    });
  }

  ngOnInit(): void {
    this.shareDataService.getData().pipe(skip(1)).subscribe((data: any) => {
      this.lang = data;
      this.changeByLang();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profile'] && changes['profile'].currentValue) {
      this.changeByLang();
    }
  }

  changeByLang() {
    this.profileStore = new StoreProfile(this.profile);
  }

  add() {
    if (this.itemForm.valid) {
      const success = translateFN()[this.translateService.getCurrentLang()].alert.successSubscribed;
      const item = { ...this.init(), ...this.itemForm.value };
      this.wNewsletterSubscriptionsHttp.addWNewsletterSubscriptions(item).pipe(
        tap((data) => (window as any).success(success)))
        .subscribe(response => {
          this.itemForm.reset();
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