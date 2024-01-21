import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBgMediumComponent } from './card-bg-medium.component';

describe('CardBgMediumComponent', () => {
  let component: CardBgMediumComponent;
  let fixture: ComponentFixture<CardBgMediumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardBgMediumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBgMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
