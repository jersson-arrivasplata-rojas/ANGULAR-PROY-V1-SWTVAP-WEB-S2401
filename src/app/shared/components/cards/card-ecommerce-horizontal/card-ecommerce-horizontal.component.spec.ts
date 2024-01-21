import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEcommerceHorizontalComponent } from './card-ecommerce-horizontal.component';

describe('CardEcommerceHorizontalComponent', () => {
  let component: CardEcommerceHorizontalComponent;
  let fixture: ComponentFixture<CardEcommerceHorizontalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardEcommerceHorizontalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardEcommerceHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
