import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipDefaultComponent } from './tooltip-default.component';

describe('TooltipDefaultComponent', () => {
  let component: TooltipDefaultComponent;
  let fixture: ComponentFixture<TooltipDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TooltipDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
