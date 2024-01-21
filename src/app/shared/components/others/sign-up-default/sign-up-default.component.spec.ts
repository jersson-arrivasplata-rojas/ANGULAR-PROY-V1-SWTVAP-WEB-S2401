import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpDefaultComponent } from './sign-up-default.component';

describe('SignUpDefaultComponent', () => {
  let component: SignUpDefaultComponent;
  let fixture: ComponentFixture<SignUpDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
