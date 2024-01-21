import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDefaultComponent } from './chat-default.component';

describe('ChatDefaultComponent', () => {
  let component: ChatDefaultComponent;
  let fixture: ComponentFixture<ChatDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
