import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceProductDetailDefaultComponent } from './ecommerce-product-detail-default.component';

describe('EcommerceProductDetailDefaultComponent', () => {
  let component: EcommerceProductDetailDefaultComponent;
  let fixture: ComponentFixture<EcommerceProductDetailDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcommerceProductDetailDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommerceProductDetailDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
