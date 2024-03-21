import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent } from '@ngx-translate/core';
import { LangEnum } from 'src/app/shared/config/lang.enum';
import { CartService } from 'src/app/shared/services/cart.service';
import { TranslateService } from 'src/app/shared/services/translate.service';

@Component({
  selector: 'swtvap-ecommerce-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @Input() catalogs: any = [];

  public cartflag: boolean = false;
  public sortBy: string = '';
  public sortOption: string = 'name|asc';
  public searchText: string = '';
  public additionalData: any = {};
  showEnglishName = false;

  constructor(public cartService: CartService, private router: Router,
    private activatedRoute: ActivatedRoute, private translateService: TranslateService) {
      this.translateService.getOnLangChange().subscribe((event: LangChangeEvent) => {
        this.showEnglishName = event.lang === LangEnum.EN;
      });
      this.cartService.getAdditionalData().subscribe((data: any) => {
        this.additionalData = data;
      });
  }

  ngOnInit() {
    const { additionalData } = this.activatedRoute.parent.snapshot.data.process;
    this.additionalData = additionalData;
    this.showEnglishName = this.translateService.getCurrentLang() === LangEnum.EN;

    this.ref({ target: { value: '' } });
  }

  ref($event: any) {
    this.cartflag = false;
    setTimeout(() => {
      this.cartflag = true;
    }, 10);
  }

  checkout($event) {
    this.router.navigate(['/checkout']);
  }

  goToProduct($event) {
    const { name } = $event;
    this.router.navigate(['/c/' + name]);
  }
}
