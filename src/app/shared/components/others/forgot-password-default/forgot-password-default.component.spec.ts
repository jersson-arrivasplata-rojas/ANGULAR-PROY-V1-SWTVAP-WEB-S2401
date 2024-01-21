import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordDefaultComponent } from './forgot-password-default.component';

describe('ForgotPasswordDefaultComponent', () => {
  let component: ForgotPasswordDefaultComponent;
  let fixture: ComponentFixture<ForgotPasswordDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
