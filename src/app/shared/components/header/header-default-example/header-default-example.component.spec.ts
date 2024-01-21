import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDefaultExampleComponent } from './header-default-example.component';

describe('HeaderDefaultExampleComponent', () => {
  let component: HeaderDefaultExampleComponent;
  let fixture: ComponentFixture<HeaderDefaultExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderDefaultExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDefaultExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
