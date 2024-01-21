import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLoginDefaultComponent } from './auth-login-default.component';

describe('AuthLoginDefaultComponent', () => {
  let component: AuthLoginDefaultComponent;
  let fixture: ComponentFixture<AuthLoginDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthLoginDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLoginDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
