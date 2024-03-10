import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { skip } from 'rxjs';
import { StoreProfile } from 'src/app/shared/class/store-profile';
import { HomeEnum } from 'src/app/shared/config/home.enum';
import { ParameterInterface } from 'src/app/shared/interfaces/parameter.interface';
import { ShareDataService } from 'src/app/shared/services/share-data.service';

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

  constructor(private shareDataService: ShareDataService) { }

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
}
