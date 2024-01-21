import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetDownloadFilesDefaultComponent } from './widget-download-files-default.component';

describe('WidgetDownloadFilesDefaultComponent', () => {
  let component: WidgetDownloadFilesDefaultComponent;
  let fixture: ComponentFixture<WidgetDownloadFilesDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetDownloadFilesDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetDownloadFilesDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
