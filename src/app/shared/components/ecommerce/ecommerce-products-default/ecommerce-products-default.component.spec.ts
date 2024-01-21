import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceProductsDefaultComponent } from './ecommerce-products-default.component';

describe('EcommerceProductsDefaultComponent', () => {
  let component: EcommerceProductsDefaultComponent;
  let fixture: ComponentFixture<EcommerceProductsDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcommerceProductsDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommerceProductsDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
