import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartInicioEcommerceImageComponent } from './cart-inicio-ecommerce-image.component';

describe('CartInicioEcommerceImageComponent', () => {
  let component: CartInicioEcommerceImageComponent;
  let fixture: ComponentFixture<CartInicioEcommerceImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartInicioEcommerceImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartInicioEcommerceImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
