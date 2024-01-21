import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageLeftComponent } from './chat-message-left.component';

describe('ChatMessageLeftComponent', () => {
  let component: ChatMessageLeftComponent;
  let fixture: ComponentFixture<ChatMessageLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessageLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
