import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEcommerceImageComponent } from './card-ecommerce-image.component';

describe('CardEcommerceImageComponent', () => {
  let component: CardEcommerceImageComponent;
  let fixture: ComponentFixture<CardEcommerceImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardEcommerceImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardEcommerceImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
