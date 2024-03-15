import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationType } from 'src/app/shared/components/carousels/carousel/carousel.animations';
import { CarouselComponent } from 'src/app/shared/components/carousels/carousel/carousel.component';
import { HomeEnum } from 'src/app/shared/config/home.enum';

@Component({
  selector: 'swtvap-ecommerce-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @ViewChild(CarouselComponent, { static: true }) carousel: CarouselComponent;

  profile: any;
  carrousel: any;
  homeEnum = HomeEnum;
  currentSlide = 0;

  animationType = AnimationType.Scale;

  slides: any[] = [
    {
      currentSlide: 0,
      name: "Scale",
      value: AnimationType.Scale,
      headline: "For Your Current Mood",
      src:"https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
    },
    {
      currentSlide: 1,
      name: "Fade",
      value: AnimationType.Fade,
      headline: "Miouw",
      src:"https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80"
    },
    {
      currentSlide: 2,
      name: "Flip",
      value: AnimationType.Flip,
      headline: "In The Wilderness",
      src:"https://images.unsplash.com/photo-1557800634-7bf3c7305596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80"
    },
    {
      currentSlide: 3,
      name: "Jack In The Box",
      value: AnimationType.JackInTheBox,
      headline: "Focus On The Writing",
      src:"https://images.unsplash.com/photo-1551410224-699683e15636?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80"
    }
  ];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const { wParameters: { profile, carrousel } } = this.activatedRoute.parent.snapshot.data.process;
    this.profile = profile?.[0] ?? {};
    this.carrousel = carrousel?.[0] ?? {};
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
}
