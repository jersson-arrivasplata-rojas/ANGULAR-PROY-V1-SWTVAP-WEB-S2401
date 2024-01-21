import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageRightComponent } from './chat-message-right.component';

describe('ChatMessageRightComponent', () => {
  let component: ChatMessageRightComponent;
  let fixture: ComponentFixture<ChatMessageRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessageRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
