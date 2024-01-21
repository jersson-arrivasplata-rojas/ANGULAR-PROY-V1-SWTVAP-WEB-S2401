import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorBubbleComponent } from './editor-bubble.component';

describe('EditorBubbleComponent', () => {
  let component: EditorBubbleComponent;
  let fixture: ComponentFixture<EditorBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
