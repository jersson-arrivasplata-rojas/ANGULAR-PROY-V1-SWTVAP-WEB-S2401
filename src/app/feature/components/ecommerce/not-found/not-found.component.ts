import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { skip } from 'rxjs';
import { HomeEnum } from 'src/app/shared/config/home.enum';
import { ShareDataService } from 'src/app/shared/services/share-data.service';

@Component({
  selector: 'swtvap-ecommerce-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {

  status: string = '404';
  title: string = 'Error!';
  message: string = '¡Lo siento! La p\u00E1gina que buscaba no existe.';

  lang: string;
  profile: any;
  currency: any;
  carrousel: any;
  proposal: any;
  notFound: any;
  notFoundStore: any;
  homeEnum = HomeEnum;

  constructor(private shareDataService: ShareDataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const { profile, currency, carrousel, proposal, notFound, lang } = this.activatedRoute.parent.snapshot.data.process;
    this.profile = profile?.[0] ?? {};
    this.currency = currency?.[0] ?? {};
    this.carrousel = carrousel?.[0] ?? {};
    this.proposal = proposal?.[0] ?? {};
    this.notFound = notFound?.[0] ?? {};
    this.lang = lang;
    this.changeNotFound();

    this.shareDataService.getData().pipe(skip(1)).subscribe((data: any) => {
      this.lang = data;
      this.changeNotFound();
    });
  }

  changeNotFound() {
    this.notFoundStore = this.notFound?.children.filter((item: any) => item.value2 === this.lang);
    this.notFoundStore.map((item: any) => {
      //const values = [this.homeEnum.NOT_FOUND_HEADER, this.homeEnum.NOT_FOUND_BODY, this.homeEnum.NOT_FOUND_STATUS];
      //const flag = values.some(value => item.code.includes(value));
      if (item.code.includes(this.homeEnum.NOT_FOUND_HEADER)) {
        this.title = item.value;
      }
      if (item.code.includes(this.homeEnum.NOT_FOUND_BODY)) {
        this.message = item.value;
      }
      if (item.code.includes(this.homeEnum.NOT_FOUND_STATUS)) {
        this.status = item.value;
      }
    });
  }
}
