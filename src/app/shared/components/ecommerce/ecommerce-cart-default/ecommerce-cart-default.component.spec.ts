import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceCartDefaultComponent } from './ecommerce-cart-default.component';

describe('EcommerceCartDefaultComponent', () => {
  let component: EcommerceCartDefaultComponent;
  let fixture: ComponentFixture<EcommerceCartDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcommerceCartDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommerceCartDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
