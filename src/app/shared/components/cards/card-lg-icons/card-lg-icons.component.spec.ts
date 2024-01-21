import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLgIconsComponent } from './card-lg-icons.component';

describe('CardLgIconsComponent', () => {
  let component: CardLgIconsComponent;
  let fixture: ComponentFixture<CardLgIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardLgIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardLgIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
