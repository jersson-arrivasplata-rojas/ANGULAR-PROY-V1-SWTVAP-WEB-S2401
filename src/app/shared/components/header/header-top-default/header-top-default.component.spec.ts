import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTopDefaultComponent } from './header-top-default.component';

describe('HeaderTopDefaultComponent', () => {
  let component: HeaderTopDefaultComponent;
  let fixture: ComponentFixture<HeaderTopDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderTopDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTopDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
