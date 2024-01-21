import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareDefaultComponent } from './share-default.component';

describe('ShareDefaultComponent', () => {
  let component: ShareDefaultComponent;
  let fixture: ComponentFixture<ShareDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
