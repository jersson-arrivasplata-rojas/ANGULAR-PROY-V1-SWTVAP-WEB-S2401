import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HomeEnum } from 'src/app/shared/config/home.enum';
import { ParameterInterface } from 'src/app/shared/interfaces/parameter.interface';

@Component({
  selector: 'swtvap-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnChanges {
  @Input() footer: ParameterInterface[] | any = [];
  @Input() lang: string;
  homeEnum = HomeEnum;
  copyright:any = {};
  menu:any = [];
  top:any = [];
  // && (item.code !== HomeEnum.COPYRIGHT_ES && item.code !== HomeEnum.COPYRIGHT_EN)
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['footer'] && changes['footer'].currentValue) {
      const item = changes['footer'].currentValue;
      this.footer = item?.children.filter((item: any) => item.value2 === this.lang && item.code !== HomeEnum.FOOTER_COPYRIGHT&& item.code !== HomeEnum.FOOTER_MENU);
      this.copyright = item?.children.find((item: any) => item.code === HomeEnum.FOOTER_COPYRIGHT).children.find((item: any) => item.value2 === this.lang);
      this.menu = item?.children.find((item: any) => item.code === HomeEnum.FOOTER_MENU).children.filter((item: any) => item.value2 === this.lang);
      this.top = item?.children.find((item: any) => item.code === HomeEnum.FOOTER_TOP).children.filter((item: any) => item.value2 === this.lang);
      console.log(this.menu)
    }
  }
}
