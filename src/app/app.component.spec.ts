import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('@AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    component = new AppComponent();
  });

  it('#should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`#should have as title 'ANGULAR-PROY-V1-SWTVAP-WEB-ADMINISTRATOR-S2401'`, () => {
    expect(component.title).toEqual('ANGULAR-PROY-V1-SWTVAP-WEB-ADMINISTRATOR-S2401');
  });
});
