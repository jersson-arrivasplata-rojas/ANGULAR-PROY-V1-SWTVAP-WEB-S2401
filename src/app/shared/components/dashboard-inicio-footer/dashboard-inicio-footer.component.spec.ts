import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInicioFooterComponent } from './dashboard-inicio-footer.component';

describe('DashboardInicioFooterComponent', () => {
  let component: DashboardInicioFooterComponent;
  let fixture: ComponentFixture<DashboardInicioFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInicioFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInicioFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
