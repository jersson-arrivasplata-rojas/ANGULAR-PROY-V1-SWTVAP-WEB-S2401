import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordDefaultComponent } from './reset-password-default.component';

describe('ResetPasswordDefaultComponent', () => {
  let component: ResetPasswordDefaultComponent;
  let fixture: ComponentFixture<ResetPasswordDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
