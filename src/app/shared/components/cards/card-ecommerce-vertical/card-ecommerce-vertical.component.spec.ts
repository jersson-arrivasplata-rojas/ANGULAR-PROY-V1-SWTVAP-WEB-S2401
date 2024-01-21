import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEcommerceVerticalComponent } from './card-ecommerce-vertical.component';

describe('CardEcommerceVerticalComponent', () => {
  let component: CardEcommerceVerticalComponent;
  let fixture: ComponentFixture<CardEcommerceVerticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardEcommerceVerticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardEcommerceVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
