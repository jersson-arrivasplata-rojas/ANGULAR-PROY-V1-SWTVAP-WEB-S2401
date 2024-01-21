import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEcommerceListComponent } from './card-ecommerce-list.component';

describe('CardEcommerceListComponent', () => {
  let component: CardEcommerceListComponent;
  let fixture: ComponentFixture<CardEcommerceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardEcommerceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardEcommerceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
