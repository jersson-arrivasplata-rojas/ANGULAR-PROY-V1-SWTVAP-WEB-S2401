import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent } from '@ngx-translate/core';
import { AnimationType } from 'src/app/shared/components/carousels/carousel/carousel.animations';
import { CarouselComponent } from 'src/app/shared/components/carousels/carousel/carousel.component';
import { CurrencySymbolEnum } from 'src/app/shared/config/currency-symbol.enum';
import { HomeEnum } from 'src/app/shared/config/home.enum';
import { LangEnum } from 'src/app/shared/config/lang.enum';
import { ProductInInterface } from 'src/app/shared/interfaces/product-in.interface';
import { CartService } from 'src/app/shared/services/cart.service';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'swtvap-ecommerce-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @ViewChild(CarouselComponent, { static: true }) carousel: CarouselComponent;

  product: ProductInInterface;
  profile: any;
  carrousel: any;
  homeEnum = HomeEnum;
  currentSlide = 0;
  assetUrl = environment.assetUrl;

  animationType = AnimationType.Scale;

  sliders: any[] = [];
  showCurrencyName = false;
  showEnglishName = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private translateService: TranslateService,
    private currencyService: CurrencyService, public cartService: CartService) {
    this.translateService.getOnLangChange().subscribe((event: LangChangeEvent) => {
      this.showEnglishName = event.lang === LangEnum.EN;
    });
    this.currencyService.getCurrenCurrency().subscribe((currency: string) => {
      this.showCurrencyName = currency === CurrencySymbolEnum.PEN;
    });
  }

  ngOnInit() {
    const { wParameters: { profile, carrousel } } = this.activatedRoute.parent.snapshot.data.process;
    this.profile = profile?.[0] ?? {};
    this.carrousel = carrousel?.[0] ?? {};
    this.showEnglishName = this.translateService.getCurrentLang() === LangEnum.EN;

    this.product = this.activatedRoute.snapshot.data.process;

    for (let index = 0; index < this.product.images.length; index++) {
      const element = this.product.images[index];
      this.sliders.push({
        currentSlide: 0,
        name: 'Scale',
        value: AnimationType.Scale,
        headline: this.product.name,
        //src: array[Math.floor(Math.random() * array.length)],
        src: this.assetUrl + 'Chascaperuart/products/' +  element.path,
      });
    }


  }

  checkout($event) {
    this.router.navigate(['/checkout']);
  }

  setAnimationType(type) {
    this.animationType = type.value;
    setTimeout(() => {
      this.carousel.onNextClick();
    });
  }

  setCurrentSlide(slide) {
    this.currentSlide = slide;
  }

  addToCart(productId, productQty, productSize?) {
    this.cartService.addToCart(productId, Number(productQty), '');
    (window as any).success('Producto agregado al carrito');
  }
}
