import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRaisedHexComponent } from './button-raised-hex.component';

describe('ButtonRaisedHexComponent', () => {
  let component: ButtonRaisedHexComponent;
  let fixture: ComponentFixture<ButtonRaisedHexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonRaisedHexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonRaisedHexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
