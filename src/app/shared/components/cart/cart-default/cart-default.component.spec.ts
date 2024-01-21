import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDefaultComponent } from './cart-default.component';

describe('CartDefaultComponent', () => {
  let component: CartDefaultComponent;
  let fixture: ComponentFixture<CartDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
