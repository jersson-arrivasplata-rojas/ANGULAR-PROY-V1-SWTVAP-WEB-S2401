import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDefaultComponent } from './contact-default.component';

describe('ContactDefaultComponent', () => {
  let component: ContactDefaultComponent;
  let fixture: ComponentFixture<ContactDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
