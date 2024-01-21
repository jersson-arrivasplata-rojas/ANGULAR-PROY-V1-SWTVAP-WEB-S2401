import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownNotificationComponent } from './dropdown-notification.component';

describe('DropdownNotificationComponent', () => {
  let component: DropdownNotificationComponent;
  let fixture: ComponentFixture<DropdownNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
