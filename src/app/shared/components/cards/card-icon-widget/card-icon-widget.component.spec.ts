import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardIconWidgetComponent } from './card-icon-widget.component';

describe('CardIconWidgetComponent', () => {
  let component: CardIconWidgetComponent;
  let fixture: ComponentFixture<CardIconWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardIconWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardIconWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
