import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetPaymentFormDefaultComponent } from './widget-payment-form-default.component';

describe('WidgetPaymentFormDefaultComponent', () => {
  let component: WidgetPaymentFormDefaultComponent;
  let fixture: ComponentFixture<WidgetPaymentFormDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetPaymentFormDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetPaymentFormDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
