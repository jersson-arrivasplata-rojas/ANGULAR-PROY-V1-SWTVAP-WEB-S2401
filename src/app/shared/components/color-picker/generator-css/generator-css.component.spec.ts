import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorCssComponent } from './generator-css.component';

describe('GeneratorCssComponent', () => {
  let component: GeneratorCssComponent;
  let fixture: ComponentFixture<GeneratorCssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratorCssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratorCssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
