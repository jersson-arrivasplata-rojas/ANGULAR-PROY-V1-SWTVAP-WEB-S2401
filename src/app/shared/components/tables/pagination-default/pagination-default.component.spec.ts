import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationDefaultComponent } from './pagination-default.component';

describe('PaginationDefaultComponent', () => {
  let component: PaginationDefaultComponent;
  let fixture: ComponentFixture<PaginationDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
