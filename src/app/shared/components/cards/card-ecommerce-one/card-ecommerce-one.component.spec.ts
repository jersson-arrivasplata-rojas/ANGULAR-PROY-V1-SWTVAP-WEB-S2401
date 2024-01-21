import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEcommerceOneComponent } from './card-ecommerce-one.component';

describe('CardEcommerceOneComponent', () => {
  let component: CardEcommerceOneComponent;
  let fixture: ComponentFixture<CardEcommerceOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardEcommerceOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardEcommerceOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
