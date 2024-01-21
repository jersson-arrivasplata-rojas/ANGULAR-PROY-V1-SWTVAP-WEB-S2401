import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarDefaultComponent } from './top-bar-default.component';

describe('TopBarDefaultComponent', () => {
  let component: TopBarDefaultComponent;
  let fixture: ComponentFixture<TopBarDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBarDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
