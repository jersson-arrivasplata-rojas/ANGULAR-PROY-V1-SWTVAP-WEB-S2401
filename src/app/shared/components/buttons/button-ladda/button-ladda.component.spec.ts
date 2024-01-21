import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLaddaComponent } from './button-ladda.component';

describe('ButtonLaddaComponent', () => {
  let component: ButtonLaddaComponent;
  let fixture: ComponentFixture<ButtonLaddaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonLaddaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonLaddaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
