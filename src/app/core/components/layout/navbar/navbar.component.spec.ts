import { NavbarComponent } from './navbar.component';

describe('@NavbarComponent', () => {
  let component: NavbarComponent;
  beforeEach(() => {
    component = new NavbarComponent();
  });
  it('#should be created', () => {

    expect(component).toBeTruthy();
  });
});
