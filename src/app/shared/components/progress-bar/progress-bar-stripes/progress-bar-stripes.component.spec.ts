import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarStripesComponent } from './progress-bar-stripes.component';

describe('ProgressBarStripesComponent', () => {
  let component: ProgressBarStripesComponent;
  let fixture: ComponentFixture<ProgressBarStripesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressBarStripesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarStripesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
