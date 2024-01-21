import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardIconMediumComponent } from './card-icon-medium.component';

describe('CardIconMediumComponent', () => {
  let component: CardIconMediumComponent;
  let fixture: ComponentFixture<CardIconMediumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardIconMediumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardIconMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
