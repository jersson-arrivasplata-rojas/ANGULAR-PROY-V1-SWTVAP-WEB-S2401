import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMtSellerComponent } from './card-mt-seller.component';

describe('CardMtSellerComponent', () => {
  let component: CardMtSellerComponent;
  let fixture: ComponentFixture<CardMtSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardMtSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMtSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
