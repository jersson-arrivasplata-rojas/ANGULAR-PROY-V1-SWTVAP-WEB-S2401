import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessPasswordRecoverDefaultComponent } from './success-password-recover-default.component';

describe('SuccessPasswordRecoverDefaultComponent', () => {
  let component: SuccessPasswordRecoverDefaultComponent;
  let fixture: ComponentFixture<SuccessPasswordRecoverDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessPasswordRecoverDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessPasswordRecoverDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
