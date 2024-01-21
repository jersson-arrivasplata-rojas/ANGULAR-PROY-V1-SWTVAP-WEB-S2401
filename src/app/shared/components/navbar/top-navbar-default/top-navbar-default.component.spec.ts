import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavbarDefaultComponent } from './top-navbar-default.component';

describe('TopNavbarDefaultComponent', () => {
  let component: TopNavbarDefaultComponent;
  let fixture: ComponentFixture<TopNavbarDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopNavbarDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavbarDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
