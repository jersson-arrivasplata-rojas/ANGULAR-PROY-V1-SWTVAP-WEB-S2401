import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDefaultComponent } from './alert-default.component';

describe('AlertDefaultComponent', () => {
  let component: AlertDefaultComponent;
  let fixture: ComponentFixture<AlertDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
