import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconIconsmindDefaultComponent } from './icon-iconsmind-default.component';

describe('IconIconsmindDefaultComponent', () => {
  let component: IconIconsmindDefaultComponent;
  let fixture: ComponentFixture<IconIconsmindDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconIconsmindDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconIconsmindDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
