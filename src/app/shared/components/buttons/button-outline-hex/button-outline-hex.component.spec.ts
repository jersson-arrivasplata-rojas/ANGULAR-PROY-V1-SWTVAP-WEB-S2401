import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonOutlineHexComponent } from './button-outline-hex.component';

describe('ButtonOutlineHexComponent', () => {
  let component: ButtonOutlineHexComponent;
  let fixture: ComponentFixture<ButtonOutlineHexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonOutlineHexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonOutlineHexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
