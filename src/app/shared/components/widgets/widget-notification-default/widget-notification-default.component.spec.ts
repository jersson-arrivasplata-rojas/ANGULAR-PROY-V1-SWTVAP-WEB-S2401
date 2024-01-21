import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetNotificationDefaultComponent } from './widget-notification-default.component';

describe('WidgetNotificationDefaultComponent', () => {
  let component: WidgetNotificationDefaultComponent;
  let fixture: ComponentFixture<WidgetNotificationDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetNotificationDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetNotificationDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
