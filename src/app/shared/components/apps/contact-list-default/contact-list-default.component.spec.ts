import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListDefaultComponent } from './contact-list-default.component';

describe('ContactListDefaultComponent', () => {
  let component: ContactListDefaultComponent;
  let fixture: ComponentFixture<ContactListDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactListDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
