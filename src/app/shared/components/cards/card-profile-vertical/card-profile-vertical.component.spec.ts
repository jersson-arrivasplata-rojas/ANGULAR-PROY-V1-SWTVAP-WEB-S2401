import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProfileVerticalComponent } from './card-profile-vertical.component';

describe('CardProfileVerticalComponent', () => {
  let component: CardProfileVerticalComponent;
  let fixture: ComponentFixture<CardProfileVerticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardProfileVerticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProfileVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
