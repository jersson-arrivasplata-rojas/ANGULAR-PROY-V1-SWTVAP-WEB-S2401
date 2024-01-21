import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbDefaultComponent } from './breadcrumb-default.component';

describe('BreadcrumbDefaultComponent', () => {
  let component: BreadcrumbDefaultComponent;
  let fixture: ComponentFixture<BreadcrumbDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumbDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
