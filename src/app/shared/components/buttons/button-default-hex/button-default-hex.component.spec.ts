import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDefaultHexComponent } from './button-default-hex.component';

describe('ButtonDefaultHexComponent', () => {
  let component: ButtonDefaultHexComponent;
  let fixture: ComponentFixture<ButtonDefaultHexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonDefaultHexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonDefaultHexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
