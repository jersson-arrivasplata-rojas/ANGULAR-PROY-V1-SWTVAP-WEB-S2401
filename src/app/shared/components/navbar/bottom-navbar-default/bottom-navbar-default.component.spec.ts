import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomNavbarDefaultComponent } from './bottom-navbar-default.component';

describe('BottomNavbarDefaultComponent', () => {
  let component: BottomNavbarDefaultComponent;
  let fixture: ComponentFixture<BottomNavbarDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomNavbarDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomNavbarDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
