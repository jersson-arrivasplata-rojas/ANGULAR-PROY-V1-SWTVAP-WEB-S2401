import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardIconLargeComponent } from './card-icon-large.component';

describe('CardIconLargeComponent', () => {
  let component: CardIconLargeComponent;
  let fixture: ComponentFixture<CardIconLargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardIconLargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardIconLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
