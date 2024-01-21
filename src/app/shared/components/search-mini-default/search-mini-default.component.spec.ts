import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMiniDefaultComponent } from './search-mini-default.component';

describe('SearchMiniDefaultComponent', () => {
  let component: SearchMiniDefaultComponent;
  let fixture: ComponentFixture<SearchMiniDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMiniDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMiniDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
