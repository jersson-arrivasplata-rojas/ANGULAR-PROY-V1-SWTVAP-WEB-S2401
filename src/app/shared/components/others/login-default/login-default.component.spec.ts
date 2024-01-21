import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDefaultComponent } from './login-default.component';

describe('LoginDefaultComponent', () => {
  let component: LoginDefaultComponent;
  let fixture: ComponentFixture<LoginDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
