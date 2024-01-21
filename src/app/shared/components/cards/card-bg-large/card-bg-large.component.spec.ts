import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBgLargeComponent } from './card-bg-large.component';

describe('CardBgLargeComponent', () => {
  let component: CardBgLargeComponent;
  let fixture: ComponentFixture<CardBgLargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardBgLargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBgLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
