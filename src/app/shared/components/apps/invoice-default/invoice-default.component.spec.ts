import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDefaultComponent } from './invoice-default.component';

describe('InvoiceDefaultComponent', () => {
  let component: InvoiceDefaultComponent;
  let fixture: ComponentFixture<InvoiceDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
