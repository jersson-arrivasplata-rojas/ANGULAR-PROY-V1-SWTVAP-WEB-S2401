import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentDefaultComponent } from './comment-default.component';

describe('CommentDefaultComponent', () => {
  let component: CommentDefaultComponent;
  let fixture: ComponentFixture<CommentDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
