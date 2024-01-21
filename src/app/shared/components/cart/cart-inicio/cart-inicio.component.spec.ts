import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartInicioComponent } from './cart-inicio.component';

describe('CartInicioComponent', () => {
  let component: CartInicioComponent;
  let fixture: ComponentFixture<CartInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
