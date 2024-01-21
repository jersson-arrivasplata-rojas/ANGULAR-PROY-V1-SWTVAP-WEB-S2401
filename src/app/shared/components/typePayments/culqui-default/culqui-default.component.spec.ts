import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CulquiDefaultComponent } from './culqui-default.component';

describe('CulquiDefaultComponent', () => {
  let component: CulquiDefaultComponent;
  let fixture: ComponentFixture<CulquiDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CulquiDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CulquiDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
