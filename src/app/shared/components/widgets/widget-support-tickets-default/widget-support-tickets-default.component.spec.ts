import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetSupportTicketsDefaultComponent } from './widget-support-tickets-default.component';

describe('WidgetSupportTicketsDefaultComponent', () => {
  let component: WidgetSupportTicketsDefaultComponent;
  let fixture: ComponentFixture<WidgetSupportTicketsDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetSupportTicketsDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetSupportTicketsDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
