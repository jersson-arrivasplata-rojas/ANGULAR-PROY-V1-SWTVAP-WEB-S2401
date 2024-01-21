import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceCheckoutDefaultComponent } from './ecommerce-checkout-default.component';

describe('EcommerceCheckoutDefaultComponent', () => {
  let component: EcommerceCheckoutDefaultComponent;
  let fixture: ComponentFixture<EcommerceCheckoutDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcommerceCheckoutDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommerceCheckoutDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
