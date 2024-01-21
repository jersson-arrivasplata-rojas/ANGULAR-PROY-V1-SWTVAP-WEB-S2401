import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorFullComponent } from './editor-full.component';

describe('EditorFullComponent', () => {
  let component: EditorFullComponent;
  let fixture: ComponentFixture<EditorFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
