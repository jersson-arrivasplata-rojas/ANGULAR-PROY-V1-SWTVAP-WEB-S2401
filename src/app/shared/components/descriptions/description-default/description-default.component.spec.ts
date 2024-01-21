import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionDefaultComponent } from './description-default.component';

describe('DescriptionDefaultComponent', () => {
  let component: DescriptionDefaultComponent;
  let fixture: ComponentFixture<DescriptionDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
