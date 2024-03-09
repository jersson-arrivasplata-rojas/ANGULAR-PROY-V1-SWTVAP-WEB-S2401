import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { skip } from 'rxjs';
import { HomeEnum } from 'src/app/shared/config/home.enum';
import { ParameterInterface } from 'src/app/shared/interfaces/parameter.interface';
import { ShareDataService } from 'src/app/shared/services/share-data.service';

@Component({
  selector: 'swtvap-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input() profile: ParameterInterface | any = {};
  @Input() carrousel: ParameterInterface | any = {};
  @Input() proposal: ParameterInterface | any = {};
  @Input() lang: string;
  @Input() hideNotCarrousel: boolean = false;

  homeEnum = HomeEnum;
  carrouselStore: any = [];
  proposalStore: any = [];

  constructor(private shareDataService: ShareDataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.shareDataService.getData().pipe(skip(1)).subscribe((data: any) => {
      this.lang = data;
      this.changeCarrousel();
      this.changeProposal();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeCarrousel();
    this.changeProposal();
  }

  changeCarrousel() {
    this.carrouselStore = this.carrousel?.children.filter((item: any) => item.value2 === this.lang);
  }

  changeProposal() {
    this.proposalStore = this.proposal?.children.filter((item: any) => item.value2 === this.lang);
  }
}
