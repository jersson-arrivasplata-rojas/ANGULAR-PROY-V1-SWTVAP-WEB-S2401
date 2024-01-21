import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleDefaultComponent } from './google-default.component';

describe('GoogleDefaultComponent', () => {
  let component: GoogleDefaultComponent;
  let fixture: ComponentFixture<GoogleDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
