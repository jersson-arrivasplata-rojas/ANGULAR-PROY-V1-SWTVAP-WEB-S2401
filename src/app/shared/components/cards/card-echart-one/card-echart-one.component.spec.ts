import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEchartOneComponent } from './card-echart-one.component';

describe('CardEchartOneComponent', () => {
  let component: CardEchartOneComponent;
  let fixture: ComponentFixture<CardEchartOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardEchartOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardEchartOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
