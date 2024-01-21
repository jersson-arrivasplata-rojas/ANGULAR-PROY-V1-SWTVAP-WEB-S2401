import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWindowAuthComponent } from './chat-window-auth.component';

describe('ChatWindowAuthComponent', () => {
  let component: ChatWindowAuthComponent;
  let fixture: ComponentFixture<ChatWindowAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatWindowAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWindowAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
