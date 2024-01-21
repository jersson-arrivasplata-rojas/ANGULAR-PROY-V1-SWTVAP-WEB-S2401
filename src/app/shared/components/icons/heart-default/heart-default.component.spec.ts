import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartDefaultComponent } from './heart-default.component';

describe('HeartDefaultComponent', () => {
  let component: HeartDefaultComponent;
  let fixture: ComponentFixture<HeartDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeartDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
