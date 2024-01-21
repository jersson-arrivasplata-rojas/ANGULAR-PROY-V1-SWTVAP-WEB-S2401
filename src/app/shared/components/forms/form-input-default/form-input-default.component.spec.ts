import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputDefaultComponent } from './form-input-default.component';

describe('FormInputDefaultComponent', () => {
  let component: FormInputDefaultComponent;
  let fixture: ComponentFixture<FormInputDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInputDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
