import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetBestSellersDefaultComponent } from './widget-best-sellers-default.component';

describe('WidgetBestSellersDefaultComponent', () => {
  let component: WidgetBestSellersDefaultComponent;
  let fixture: ComponentFixture<WidgetBestSellersDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetBestSellersDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetBestSellersDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
