import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleSecondDefaultComponent } from './google-second-default.component';

describe('GoogleSecondDefaultComponent', () => {
  let component: GoogleSecondDefaultComponent;
  let fixture: ComponentFixture<GoogleSecondDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleSecondDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleSecondDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
