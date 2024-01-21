import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterStoreDefaultComponent } from './footer-store-default.component';

describe('FooterStoreDefaultComponent', () => {
  let component: FooterStoreDefaultComponent;
  let fixture: ComponentFixture<FooterStoreDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterStoreDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterStoreDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
