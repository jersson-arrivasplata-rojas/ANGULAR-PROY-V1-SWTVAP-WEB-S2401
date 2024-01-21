import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEcommerceDefaultComponent } from './card-ecommerce-default.component';

describe('CardEcommerceDefaultComponent', () => {
  let component: CardEcommerceDefaultComponent;
  let fixture: ComponentFixture<CardEcommerceDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardEcommerceDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardEcommerceDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
