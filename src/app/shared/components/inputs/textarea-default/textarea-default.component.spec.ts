import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaDefaultComponent } from './textarea-default.component';

describe('TextareaDefaultComponent', () => {
  let component: TextareaDefaultComponent;
  let fixture: ComponentFixture<TextareaDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextareaDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
