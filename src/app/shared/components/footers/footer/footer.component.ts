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
  @Input() footer: ParameterInterface | any = {};
  @Input() lang: string;
  homeEnum = HomeEnum;
  copyright: any = {};
  menu: any = [];
  top: any = [];
  profileStore: StoreProfile;
  footerStore: any = {};

  constructor(private shareDataService: ShareDataService) { }

  ngOnInit(): void {
    this.shareDataService.getData().pipe(skip(1)).subscribe((data: any) => {
      this.lang = data;
      this.changeByLang();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['footer'] && changes['footer'].currentValue) {
      this.changeByLang();
    }
  }

  changeByLang() {
    this.footerStore = this.footer?.children.filter((item: any) => item.value2 === this.lang && item.code !== HomeEnum.FOOTER_COPYRIGHT && item.code !== HomeEnum.FOOTER_MENU);
    this.copyright = this.footer?.children.find((item: any) => item.code === HomeEnum.FOOTER_COPYRIGHT).children.find((item: any) => item.value2 === this.lang);
    this.menu = this.footer?.children.find((item: any) => item.code === HomeEnum.FOOTER_MENU).children.filter((item: any) => item.value2 === this.lang);
    this.top = this.footer?.children.find((item: any) => item.code === HomeEnum.FOOTER_TOP).children.filter((item: any) => item.value2 === this.lang);
    this.profileStore = new StoreProfile(this.profile);
  }
}
