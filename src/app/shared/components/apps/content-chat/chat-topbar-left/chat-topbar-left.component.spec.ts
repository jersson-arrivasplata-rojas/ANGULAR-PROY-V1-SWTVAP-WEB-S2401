import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTopbarLeftComponent } from './chat-topbar-left.component';

describe('ChatTopbarLeftComponent', () => {
  let component: ChatTopbarLeftComponent;
  let fixture: ComponentFixture<ChatTopbarLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatTopbarLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatTopbarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
