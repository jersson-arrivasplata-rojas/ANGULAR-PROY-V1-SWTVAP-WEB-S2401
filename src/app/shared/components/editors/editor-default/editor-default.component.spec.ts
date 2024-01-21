import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorDefaultComponent } from './editor-default.component';

describe('EditorDefaultComponent', () => {
  let component: EditorDefaultComponent;
  let fixture: ComponentFixture<EditorDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
