import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPricingTableComponent } from './card-pricing-table.component';

describe('CardPricingTableComponent', () => {
  let component: CardPricingTableComponent;
  let fixture: ComponentFixture<CardPricingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPricingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPricingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
